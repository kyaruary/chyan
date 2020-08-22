import { MiddlewareTypes } from "../@types/types";
import { IMiddleware, IPipe, IFilter, IStatic, IInterceptor, IGuard, ILogger } from "../interface/mod";

export class MiddlewareStorage {
  static filters: IFilter[] = [];
  static middlewares: IMiddleware[] = [];
  static staticServers: IStatic[] = [];
  static interceptors: IInterceptor[] = [];
  static guards: IGuard[] = [];
  static pipes: IPipe[] = [];
  static loggers: ILogger[] = [];

  static add(m: any, type: MiddlewareTypes) {
    switch (type) {
      case MiddlewareTypes.Pipe:
        this.addPipe(m);
        break;
      case MiddlewareTypes.Filter:
        this.addFilter(m);
        break;
      case MiddlewareTypes.Interceptor:
        this.addInterceptor(m);
        break;
      case MiddlewareTypes.Middleware:
        this.addMiddleware(m);
        break;
      case MiddlewareTypes.Guard:
        this.addGuard(m);
        break;
      case MiddlewareTypes.StaticServer:
        this.addStaic(m);
        break;
      case MiddlewareTypes.Logger:
        this.addLogger(m);
        break;
      default:
        break;
    }
  }

  private static addStaic(m: IStatic) {
    this.staticServers.push(m);
  }

  private static addGuard(m: IGuard) {
    this.guards.push(m);
  }

  private static addInterceptor(m: IInterceptor) {
    this.interceptors.push(m);
  }

  private static addFilter(m: IFilter) {
    this.filters.push(m);
  }

  private static addMiddleware(m: IMiddleware) {
    this.middlewares.push(m);
  }

  private static addPipe(m: IPipe) {
    this.pipes.push(m);
  }

  private static addLogger(logger: ILogger) {
    this.loggers.push(logger);
  }
}
