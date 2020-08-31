import bodyParser from "koa-bodyparser";
import "reflect-metadata";
import { Utils } from "../utils";
import Application, { Context } from "koa";
import { MetaDataStorage } from "./metadata";
import { RouterUtils } from "./router";
import cookie from "koa-cookie";
import session from "koa-session";
import serve from "koa-static";
import { Constructor, MiddlewareTypes, InjectorDescriptor, InjectorType, GuardConstructor, InterceptorConstructor, FilterConstructor, PipeConstructor, LoggerConstructor } from "../@types/types";
import * as Uuid from "uuid";
import { MiddlewareStorage } from "./middleware-storage";
import { EnvConfig } from "./EnvConfig";
import multer from "@koa/multer";
export interface AppConfig {
  sessionConfig?: any;
  bodyParserConfig?: any;
  cookieConfig?: any;
  proxy?: boolean;
  multerConfig?: multer.Options;
  controllers?: string[] | string;
}

export class Habe {
  private middlewares: Application.Middleware[] = [];

  private useStaticServer = false;
  private staticOption?: serve.Options;
  private staticRoot = ".";

  static appConfig: AppConfig = {
    sessionConfig: {},
    bodyParserConfig: {},
    cookieConfig: {},
    proxy: false,
  };

  static envConfig: EnvConfig;

  private static habe: Habe | null = null;

  constructor(private app: Application) {}

  static createApplication(appConfig?: AppConfig): Habe {
    if (this.habe === null) {
      this.initAppConfig(appConfig);
      const app = new Application();
      this.habe = new Habe(app);
    }
    return this.habe;
  }

  private static initAppConfig(appConfig?: AppConfig) {
    if (appConfig) {
      Object.assign(this.appConfig, appConfig);
    }
    Object.freeze(this.appConfig);
  }

  private u(m: Constructor, type: MiddlewareTypes) {
    m.prototype.id = m.prototype.id || Uuid.v4();
    const params = (Reflect.getMetadata("design:paramtypes", m) as Constructor[]) || [];
    const args = params.map((param) => {
      param.prototype.id = param.prototype.id || Uuid.v4();
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

  // useGlobalMiddleware(middleware: MiddlewareConstructor) {
  //   this.u(middleware, MiddlewareTypes.Middleware);
  // }

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

    if (Habe.appConfig.controllers) {
      const c: string[] = [];
      await Utils.atuoInject(c.concat(Habe.appConfig.controllers));
    }

    await MetaDataStorage.resolve();

    this.app.proxy = Habe.appConfig.proxy!;

    this.app.keys = ["session"];

    const SessionConfig: Partial<session.opts> = {};

    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        if (MiddlewareStorage.filters.length === 0) {
          throw e;
        }
        for (const filter of MiddlewareStorage.filters) {
          if (!ctx.respond) filter.catch(e, ctx as Context);
        }
      } finally {
        for (const looger of MiddlewareStorage.loggers) {
          looger.log(ctx as Context);
        }
      }
    });

    for (const m of this.middlewares) {
      this.app.use(m);
    }

    this.app.use(bodyParser());
    this.app.use(cookie());
    this.app.use(session(SessionConfig, this.app));

    const router = RouterUtils.getRouter();

    this.app.use(router.routes()).use(router.allowedMethods());

    if (this.useStaticServer) {
      this.app.use(async (ctx, next) => {
        ctx.isStatic = true;
        await next();
      });
      this.app.use(serve(this.staticRoot, this.staticOption));
    }

    this.app.use(() => {
      throw { code: 404, msg: "Not Found!" };
    });

    this.app.listen(config.port, () => {
      console.log(`server is running on  http://0.0.0.0:${config.port}`);
    });
  }
}

MetaDataStorage.getMetaDataStroage().injectEnvConfig();

Habe.envConfig = MetaDataStorage.envConfig;
