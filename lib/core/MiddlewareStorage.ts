import { KoaMiddleware, ChyanExceptionFilter, ChyanMiddleware, ChyanInterceptor } from "../types/types";
import { Injectable } from "@chyan/ioc";
import { DefaultInterceptor } from "../common/middlewares/DefaultInterceptor";
import { DefaultExceptionFilter } from "../common/middlewares/DefaultExceptionFilter";

@Injectable()
export class MiddlewaresStorage {
  globalInterceptor: ChyanInterceptor;

  globalExceptionFilter: ChyanExceptionFilter;

  constructor(di: DefaultInterceptor, def: DefaultExceptionFilter) {
    this.globalInterceptor = di;
    this.globalExceptionFilter = def;
  }

  private _middlewares: KoaMiddleware[] = [];

  get middlewares() {
    return this._middlewares;
  }

  addKoaMiddleware(middleware: KoaMiddleware<any, any>) {
    this.middlewares.push(middleware);
  }

  addChyanMiddleware(middleware: ChyanMiddleware) {
    this.middlewares.push(middleware.apply.bind(middleware));
  }
}
