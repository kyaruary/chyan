import { RouteMethod } from "../../constant/RouteMethods";
import { Constructor } from "../../@types/types";
import { Action } from "../internal/Action";
import { Helper } from "../helper";

export function Get(path?: string) {
  return createRouterMethod(RouteMethod.GET, path);
}

export function Post(path?: string) {
  return createRouterMethod(RouteMethod.POST, path);
}

export function Delete(path?: string) {
  return createRouterMethod(RouteMethod.DELETE, path);
}

export function Trace(path?: string) {
  return createRouterMethod(RouteMethod.TRACE, path);
}

export function Put(path?: string) {
  return createRouterMethod(RouteMethod.PUT, path);
}

export function Options(path?: string) {
  return createRouterMethod(RouteMethod.OPTIONS, path);
}
export function Head(path?: string) {
  return createRouterMethod(RouteMethod.HEAD, path);
}

export function Connect(path?: string) {
  return createRouterMethod(RouteMethod.CONNECT, path);
}

function createRouterMethod(method: RouteMethod, suffix: string = "") {
  const callback = (target: Object, key: string, des: PropertyDescriptor): RouterMetadata => {
    return { suffix, method, isRouter: true };
  };
  return Action(callback);
}

export type RouterMetadata = {
  suffix: string;
  method: RouteMethod;
  isRouter: boolean;
  middlewares?: Function[];
};
