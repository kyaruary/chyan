import KoaRouter from "koa-router";
import { Constructor } from "../interface";
import { Context, Next } from "koa";
import { RouteMethod } from "../constant/RouteMethods";
import { MiddlewaresStorage } from "./middlewate-storage";

const router = new KoaRouter();

function add(method: RouteMethod, prefix: string, suffix: string, callback: Function, argTypes: Constructor[], middlewares: Function[], argsFn: Function[]) {
  const fullPath = generateRouterPath(prefix, suffix);
  (router as any)[method.toLowerCase()](fullPath, ...middlewares, async (c: Context, next: Next) => {
    // const { args, argumentsMetadatas } = injectArugments(c, r, next);
    const args = argsFn.map((arg) => arg(c, next));

    const result = await callback(...args);
    if (result !== undefined) await MiddlewaresStorage.interceptor.apply(result, c);
  });
}

function formatRouter(url: string) {
  return url === "/" ? url : url.replace(/\/$/, "");
}

function generateRouterPath(prefix: string, sub_path: string) {
  return formatRouter(`/${prefix}/${sub_path}`.replace(/[/]{2,}/g, "/"));
}

interface ValidateMetadata {
  value: string;
  type: Function;
}

function getRouter() {
  return router;
}

export const RouterStorage = {
  add,
  getRouter,
};
