import { Injectable } from "@chyan/ioc";
import Router from "koa-router";
import { ChyanContext, ChyanNext } from "..";
import { RouterMetaStorage } from "./RouterMetaStorage";

@Injectable()
export class ChyanRouter {
  private router = new Router();

  getRouter() {
    return this.router;
  }

  resolve() {
    const routerStorages = RouterMetaStorage.getRouterMetas();
    for (const meta of routerStorages) {
      this.router[meta.method](meta.path, ...meta.middlewares, async (ctx: ChyanContext, next: ChyanNext) => {
        const args: object[] = [];
        for (const arg of meta.args) {
          const value = arg?.useValue?.(ctx, next);
          args[arg.index] = value;
        }
        return await meta.callback(...args.concat(ctx, next));
      });
    }
  }
}
