import bodyParser from "koa-body-parser";
import "reflect-metadata";
import { Utils } from "../utils";
import Application from "koa";
import { MetaDataStorage } from "./metadata";
import { RouterUtils } from "./router";
import cookie from "koa-cookie";
import session from "koa-session";
import serve from "koa-static";
import { Constructor, MiddlewareTypes, InjectorDescriptor, InjectorType, MiddlewareConstructor, GuardConstructor, InterceptorConstructor, FilterConstructor, PipeConstructor, StaticConstructor, LoggerConstructor } from "../@types/types";
import * as Uuid from "uuid";
export class Habe {
  private middlewares: Application.Middleware[] = [];

  private useStaticServer = false;
  private staticOption?: serve.Options;
  private staticRoot = ".";

  private static habe: Habe | null = null;

  constructor(private app: Application) {}

  static createApplication(): Habe {
    if (this.habe === null) {
      MetaDataStorage.getMetaDataStroage().injectConfig();
      const app = new Application();
      this.habe = new Habe(app);
    }
    return this.habe;
  }

  private u(m: Constructor, type: MiddlewareTypes) {
    m.prototype.id = m.prototype.id ?? Uuid.v4();
    const params = (Reflect.getMetadata("design:paramtypes", m) as Constructor[]) ?? [];
    const args = params.map((param) => {
      param.prototype.id = param.prototype.id ?? Uuid.v4();
      return param.prototype.id;
    });
    const des: InjectorDescriptor = {
      target: m.prototype.id,
      args: args,
      proto: m,
      priority: args.length,
      type: InjectorType.Middleware,
      middlewareTypes: type,
    };
    MetaDataStorage.addMiddleware(des);
  }

  useGlobalMiddleware(middleware: MiddlewareConstructor) {
    this.u(middleware, MiddlewareTypes.Middleware);
  }

  useGlobalGuard(guard: GuardConstructor) {
    this.u(guard, MiddlewareTypes.Guard);
  }

  useGlobalInterceptor(ic: InterceptorConstructor) {
    this.u(ic, MiddlewareTypes.Interceptor);
  }

  useGlobalExceptionFilter(filter: FilterConstructor) {
    this.u(filter, MiddlewareTypes.Filter);
  }

  useGlobalPipe(pipe: PipeConstructor) {
    this.u(pipe, MiddlewareTypes.Pipe);
  }

  useStatic(root: string, opts?: serve.Options) {
    this.useStaticServer = true;
    this.staticRoot = root;
    this.staticOption = opts;
  }

  useLogger(logger: LoggerConstructor) {
    this.u(logger, MiddlewareTypes.Logger);
  }

  useMiddleware(middleware: Application.Middleware) {
    this.middlewares.push(middleware);
  }

  async run() {
    const config = MetaDataStorage.envConfig;
    MetaDataStorage.resolve();

    if (config.controllers) {
      await Utils.atuoInject();
    }

    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        console.log(e, "exception filter");
      }
    });

    this.app.keys = ["session"];

    const SessionConfig: Partial<session.opts> = {};

    this.app.use(bodyParser());
    this.app.use(cookie());
    this.app.use(session(SessionConfig, this.app));

    for (const m of this.middlewares) {
      this.app.use(m);
    }

    const router = RouterUtils.getRouter();
    this.app.use(router.routes()).use(router.allowedMethods());

    if (this.useStaticServer) {
      this.app.use(serve(this.staticRoot, this.staticOption));
    }

    this.app.listen(config.port, () => {
      console.log(`server is running on  http://localhost:${config.port}`);
    });
  }
}
