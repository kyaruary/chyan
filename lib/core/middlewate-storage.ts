import { Middleware } from "koa";
import Router from "koa-router";
import { Context } from "vm";
import { HttpException } from "../constant/Exception";

class ChyanInterceptor implements Interceptor {
  apply(body: any, c: Context) {
    c.body = body;
  }
}
export interface ExceptionFilter {
  catch(e: Error, c: Context): void;
}

class ChyanExceptionFilter implements ExceptionFilter {
  catch(e: Error, c: Context) {
    if (e instanceof HttpException) {
      c.status = e.status;
      c.body = e.msg || e.message;
    } else {
      c.status = 500;
      c.body = "Internal Server Error";
    }
  }
}

export class MiddlewaresStorage {
  private static index = 0;

  static interceptor: Interceptor = new ChyanInterceptor();

  static exceptionFilter: ExceptionFilter = new ChyanExceptionFilter();

  static middlewares: MiddlewareDescriptor[] = [];

  static addRouter(router: Router) {
    this.middlewares.push({ middleware: router, index: this.index++, type: "router" });
  }

  static addMiddleware(middleware: Middleware) {
    this.middlewares.push({ middleware, index: this.index++, type: "middleware" });
  }
}

type MiddlewareDescriptor = {
  middleware: Middleware | Router;
  path?: string;
  index: number;
  type: "router" | "middleware";
};

export interface Interceptor {
  apply(body: any, c: Context): void | Promise<void>;
}
