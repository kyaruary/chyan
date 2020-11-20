import bodyParser from "koa-bodyparser";
import cookie from "koa-cookie";
import { MiddlewaresStorage } from "./MiddlewareStorage";
import { ChyanMiddleware, Constructor, KoaMiddleware, ChyanExceptionFilter, ChyanInterceptor } from "../types/types";
import { ChyanRouter } from "./ChyanRouter";
import { Injectable, ioc } from "accioo";
import { ChyanLogger } from "../common/logger";
import { loader } from "./loader";
import { NotFoundException } from "../constant/Exception";
import KoaApplication from "koa";

@Injectable()
export class RawKoaApplication extends KoaApplication {}

@Injectable()
export class Application {
  private routerPaths: { root: string; fileReg?: RegExp }[] = [];
  private routerIndex = -1;

  constructor(private logger: ChyanLogger, private ms: MiddlewaresStorage, private app: RawKoaApplication, private router: ChyanRouter) {}

  use<T = {}, S = {}>(middleware: KoaMiddleware<T, S>) {
    this.ms.addKoaMiddleware(middleware);
    return this;
  }

  useGlobalMiddleware(middleware: Constructor<ChyanMiddleware>) {
    if (middleware.toString().slice(0, 5) === "class") {
      const m = ioc.fetchInjectorViaClass<ChyanMiddleware>(middleware as Constructor<ChyanMiddleware>);
      this.use(m!.apply.bind(m));
      return this;
    }
  }

  private throwNotFountInIocError(name: string) {
    this.logger.fatal(`Use @Injectable() Above Class: ${name} !`);
  }

  useGlobalInterceptor(interceptor: Constructor<ChyanInterceptor>) {
    const i = ioc.fetchInjectorViaClass(interceptor);
    if (i !== null) {
      this.ms.globalInterceptor = i;
    } else {
      this.throwNotFountInIocError(interceptor.name);
    }
    return this;
  }

  useGlobalExceptionFilter(filter: Constructor<ChyanExceptionFilter>) {
    const f = ioc.fetchInjectorViaClass(filter);
    if (f !== null) {
      this.ms.globalExceptionFilter = f;
    } else {
      this.throwNotFountInIocError(filter.name);
    }
    return this;
  }

  scanRouter(root: string, fileReg?: RegExp) {
    this.routerPaths.push({ root, fileReg });
    if (this.routerIndex === -1) {
      this.routerIndex = this.ms.getNextPosition();
    }
    return this;
  }

  async run(port = 8080, hostname = "localhost") {
    for (const routerPath of this.routerPaths) {
      await loader.load(routerPath.root, routerPath.fileReg);
    }

    this.router.resolve();

    if (this.routerIndex !== -1) {
      this.ms.insert(this.routerIndex, this.router.getRouter().routes());
      this.ms.insert(this.routerIndex + 1, this.router.getRouter().allowedMethods());
    }

    this.app.use(bodyParser());
    this.app.use(cookie());

    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        await this.ms.globalExceptionFilter.catch(e, ctx);
      }
    });

    this.app.use(async (ctx, next) => {
      await this.ms.globalInterceptor.transform(ctx);
      const body = await next();
      if (body !== undefined) {
        ctx.status = 200;
        await this.ms.globalInterceptor.intercept(body, ctx);
      }
    });

    for (const m of this.ms.middlewares) {
      this.app.use(m);
    }

    this.app.use(async (ctx, next) => {
      throw NotFoundException();
    });

    return new Promise((resolve) => {
      this.app.listen(port, hostname, () => {
        this.logger.info(`server is running on  http://${hostname}:${port}`);
        resolve();
      });
    });
  }
}
