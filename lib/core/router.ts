import KoaRouter from "koa-router";
import { RouteMethod } from "../constant/RouteMethods";
import { MiddlewaresStorage } from "./MiddlewareStorage";
import { ChyanContext, ChyanNext, Constructor } from "../types/types";
import { ArgsMetadata, PipeFunction } from "../decorators";
import { chyanLogger } from "../utils/chyanlog";

const router = new KoaRouter();

function add(method: RouteMethod, prefix: string, suffix: string, callback: Function, argsMetadata: ArgsMetadata[], middlewares: Function[]) {
  const fullPath = generateRouterPath(prefix, suffix);
  const useDefaultParameter = argsMetadata.length === 0;
  const usePipe = argsMetadata.map((a) => a.usePipe).length !== 0;

  (router as any)[method.toLowerCase()](fullPath, ...middlewares, async (c: ChyanContext, next: ChyanNext) => {
    const args: RealArg[] = argsMetadata.map((arg) => ({ value: arg.useValue(c, next), usePipe: arg.usePipe, pipe: arg.pipe, metatype: arg.metatype, index: arg.index }));
    // todo global pipe
    if (usePipe) {
      for (const arg of (args as RealArg[]).filter((arg) => arg.usePipe)) {
        args[arg.index].value = (await arg.pipe?.(arg.value, arg.metatype)) ?? arg.value;
      }
    }
    const result = await callback(...(useDefaultParameter ? [c, next] : args.map((arg) => arg.value)));
    if (result !== undefined) await MiddlewaresStorage.globalInterceptor.apply(result, c);
  });
}

function formatRouter(url: string) {
  return url === "/" ? url : url.replace(/\/$/, "");
}

function generateRouterPath(prefix: string, sub_path: string) {
  return formatRouter(`/${prefix}/${sub_path}`.replace(/[/]{2,}/g, "/"));
}

function getRouter() {
  return router;
}

export const RouterStorage = {
  add,
  getRouter,
};

interface RealArg {
  value: any;
  usePipe: boolean;
  pipe?: PipeFunction;
  metatype: any;
  index: number;
}
