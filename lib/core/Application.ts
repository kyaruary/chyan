import bodyParser from "koa-bodyparser";
import KoaApplication, { Middleware } from "koa";
import cookie from "koa-cookie";
import Router from "koa-router";
import { GlobalExceptionFilter, GlobalPipe, GlobalInterceptor, MiddlewaresStorage, CanActive, GlobalMiddleware } from "./MiddlewareStorage";
import { ChyanContext, ChyanNext, Constructor } from "../types/types";
import { threadId } from "worker_threads";
import { nextTick } from "process";

// 包装koaApplication类
export class Application {
  private koaApplication = new KoaApplication();
  private globalGuardPath: RegExp = /^\//;
  constructor() {}

  useGlobalMiddleware(middleware: Middleware | Constructor<GlobalMiddleware> | GlobalMiddleware) {
    MiddlewaresStorage.addMiddleware(middleware);
  }

  useGlobalGuard(guard: Constructor<CanActive>, path?: RegExp) {
    if (path) this.globalGuardPath = path;
    MiddlewaresStorage.globalGuard = MiddlewaresStorage.fetchMiddlewareViaPool(guard);
  }

  useGlobalInterceptor(interceptor: Constructor<GlobalInterceptor>) {
    MiddlewaresStorage.globalInterceptor = MiddlewaresStorage.fetchMiddlewareViaPool(interceptor);
  }

  useGlobalExceptionFilter(filter: Constructor<GlobalExceptionFilter>) {
    MiddlewaresStorage.globalExceptionFilter = MiddlewaresStorage.fetchMiddlewareViaPool(filter);
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
        await MiddlewaresStorage.globalExceptionFilter.catch(e, ctx);
      }
    });

    this.koaApplication.use(bodyParser());
    this.koaApplication.use(cookie());

    this.koaApplication.use(async (c: ChyanContext, next: ChyanNext) => {
      if (c.url.match(this.globalGuardPath)) {
        await MiddlewaresStorage.globalGuard.canActive(c);
      }
      await next();
    });

    for (const m of MiddlewaresStorage.middlewares) {
      if (m.type === "router") {
        const router = m.middleware as Router;
        this.koaApplication.use(router.routes()).use(router.allowedMethods());
      } else {
        this.koaApplication.use(m.middleware as Middleware);
      }
    }

    return new Promise((resolve, reject) => {
      this.koaApplication.listen(port, hostname, () => {
        console.log(`server is running on  http://${hostname}:${port}`);
        resolve();
      });
    });
  }
}
