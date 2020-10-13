import { Middleware } from "koa";
import Router from "koa-router";
import { ChyanMetaKey } from "../constant";
import { HttpException } from "../constant/Exception";
import { ChyanNext, Constructor, ChyanContext } from "../types/types";
import { isClass } from "../utils/CheckClassType";
import { chyanLogger } from "../utils/chyanlog";
import { fetchInjector } from "./Ioc";
import { fetchMetadata } from "./MetadataStorage";

class ChyanInterceptor implements GlobalInterceptor {
  apply(body: any, c: ChyanContext) {
    c.body = body;
  }
}

class ChyanExceptionFilter implements GlobalExceptionFilter {
  catch(e: Error, c: ChyanContext) {
    if (e instanceof HttpException) {
      c.status = e.status;
      c.body = e.msg || e.message;
    } else {
      console.log(e);
      c.status = 500;
      c.body = "Internal Server Error";
    }
  }
}

class ChyanGlobalPipe implements GlobalPipe {
  validate() {}
}

class ChyanGlobalGuard implements CanActive {
  canActive() {}
}

export class MiddlewaresStorage {
  private static index = 0;

  static globalInterceptor: GlobalInterceptor = new ChyanInterceptor();

  static globalExceptionFilter: GlobalExceptionFilter = new ChyanExceptionFilter();

  static globalPipe: GlobalPipe = new ChyanGlobalPipe();

  static globalGuard: CanActive = new ChyanGlobalGuard();

  static globalMiddlewares: GlobalMiddleware[] = [];

  static middlewares: MiddlewareDescriptor[] = [];

  static addRouter(router: Router) {
    this.middlewares.push({ middleware: router, index: this.index++, type: "router" });
  }

  static addMiddleware(middleware: Middleware | Constructor<GlobalMiddleware> | GlobalMiddleware) {
    if (typeof middleware === "object" && "apply" in middleware && typeof middleware["apply"] === "function") {
      this.addKoaMiddleware(middleware["apply"]);
    } else {
      if (isClass(middleware)) {
        const id = fetchMetadata<string>(ChyanMetaKey.id, middleware);
        if (id) {
          const m = fetchInjector<GlobalMiddleware>(id);
          this.addKoaMiddleware(m!.apply);
        } else {
          chyanLogger.fatal(`You may forgot add @Injectable decorator in class ${(middleware as Constructor).name} or new it manual`);
          process.exit();
        }
      } else {
        this.addKoaMiddleware(middleware as Middleware);
      }
    }
  }

  private static addKoaMiddleware(middleware: Middleware) {
    this.middlewares.push({ middleware, index: this.index++, type: "middleware" });
  }

  public static fetchMiddlewareViaPool<T>(m: Constructor<T>): T {
    const id = fetchMetadata(ChyanMetaKey.id, m);
    if (id) {
      return fetchInjector<T>(id)!;
    }
    chyanLogger.fatal(` can not found ${m.name} in injector pool, check out use decorator or not`);
    process.exit();
  }
}

type MiddlewareDescriptor = {
  middleware: Middleware | Router;
  path?: string;
  index: number;
  type: "router" | "middleware";
};

export interface GlobalInterceptor {
  apply(body: any, c: ChyanContext): void | Promise<void>;
}

export interface GlobalPipe {
  validate(value: any[], types: Function[], c: ChyanContext): void | Promise<void>;
}

export interface GlobalExceptionFilter {
  catch(e: Error, c: ChyanContext): void | Promise<void>;
}

export interface CanActive {
  canActive(c: ChyanContext): void | Promise<void>;
}

export interface GlobalMiddleware {
  apply(c: ChyanContext, next: ChyanNext): void | Promise<void>;
}
