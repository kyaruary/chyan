import bodyParser from "koa-bodyparser";
import KoaApplication, { Context, Middleware, Next } from "koa";
import cookie from "koa-cookie";
import { NotFoundException } from "../constant/Exception";
import Router from "koa-router";
import { ExceptionFilter, Interceptor, MiddlewaresStorage } from "./middlewate-storage";

// 工厂函数
export class Chyan {
  static createApplication(): Application {
    const app = new Application(new KoaApplication());
    return app;
  }
}

// 包装koaApplication类
export class Application {
  constructor(private koaApplication: KoaApplication) {}

  useGlobalMiddleware(middleware: Middleware, afterRouter: boolean = false, path?: string) {
    MiddlewaresStorage.addMiddleware({ fn: middleware, afterRouter, path });
  }

  // useGlobalGuard(guard: GuardConstructor) {
  //   this.u(guard, MiddlewareTypes.Guard);
  // }

  useGlobalInterceptor(interceptor: Interceptor) {
    MiddlewaresStorage.interceptor = interceptor;
  }

  useGlobalExceptionFilter(filter: ExceptionFilter) {
    MiddlewaresStorage.exceptionFilter = filter;
  }

  // useGlobalPipe(pipe: PipeConstructor) {
  //   this.u(pipe, MiddlewareTypes.Pipe);
  // }

  useRouter(router: Router) {
    MiddlewaresStorage.addRouter(router);
  }

  getKoaApplication() {
    return this.koaApplication;
  }

  async run(port = 8080, hostname = "localhost") {
    this.koaApplication.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        console.log(e);
        MiddlewaresStorage.exceptionFilter.catch(e, ctx);
      }
    });

    this.koaApplication.use(bodyParser());

    this.koaApplication.use(cookie());

    // ...middleware
    for (const m of MiddlewaresStorage.middlewares) {
      if (!m.afterRouter) this.koaApplication.use(m.fn);
    }

    for (const router of MiddlewaresStorage.routers) {
      this.koaApplication.use(router.routes()).use(router.allowedMethods());
    }

    this.koaApplication.use((c: Context, next: Next) => {});

    //..afterRouter middleware
    for (const m of MiddlewaresStorage.middlewares) {
      if (m.afterRouter) this.koaApplication.use(m.fn);
    }

    // ...after middleware
    this.koaApplication.use((ctx: Context) => {
      ctx.status = 404;
      throw NotFoundException();
    });

    this.koaApplication.listen(port, hostname, () => {
      console.log(`server is running on  http://${hostname}:${port}`);
    });
  }
}
