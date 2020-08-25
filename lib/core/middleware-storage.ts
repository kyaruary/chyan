import { MiddlewareTypes } from "../@types/types";
import { Middleware, Pipe, Filter, Interceptor, Guard, Logger } from "../interface/mod";
import { HabeInterceptor } from "../middlewares/DefaultInterceptor";

export class MiddlewareStorage {
  static filters: Filter[] = [];
  static middlewares: Middleware[] = [];
  static interceptor: Interceptor = new HabeInterceptor();
  static guards: Guard[] = [];
  static pipes: Pipe[] = [];
  static loggers: Logger[] = [];

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
      case MiddlewareTypes.Logger:
        this.addLogger(m);
        break;
      default:
        break;
    }
  }

  private static addGuard(m: Guard) {
    this.guards.push(m);
  }

  private static addInterceptor(m: Interceptor) {
    this.interceptor = m;
  }

  private static addFilter(m: Filter) {
    this.filters.push(m);
  }

  private static addMiddleware(m: Middleware) {
    this.middlewares.push(m);
  }

  private static addPipe(m: Pipe) {
    this.pipes.push(m);
  }

  private static addLogger(logger: Logger) {
    this.loggers.push(logger);
  }
}
