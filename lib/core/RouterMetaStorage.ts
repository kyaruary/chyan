import { RouteMethod } from "../constant/RouteMethods";

import { ArgsMetadata } from "../decorators";

const routerMetas: RouterMeta[] = [];

type RouterMeta = {
  path: string;
  args: ArgsMetadata[];
  method: string;
  middlewares: Function[];
  callback: Function;
};

function collect(method: RouteMethod, prefix: string, suffix: string, callback: Function, argsMetadata: ArgsMetadata[], middlewares: Function[]) {
  const fullPath = generateRouterPath(prefix, suffix);
  routerMetas.push({ path: fullPath, args: argsMetadata, callback, middlewares, method: method.toLowerCase() });
}

function formatRouter(url: string) {
  return url === "/" ? url : url.replace(/\/$/, "");
}

function generateRouterPath(prefix: string, sub_path: string) {
  return formatRouter(`/${prefix}/${sub_path}`.replace(/[/]{2,}/g, "/"));
}

function getRouterMetas() {
  return routerMetas.map((r) => r);
}

export const RouterMetaStorage = {
  collect,
  getRouterMetas,
};
