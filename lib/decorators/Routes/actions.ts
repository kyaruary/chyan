import { attachMetadata, fetchMetadata, metaKeyIsExist } from "@chyan/ioc";
import { RouteMethod } from "../../constant/RouteMethods";
import { RouteMetaKey } from "./metakey";

export function createRouterMethod(method: RouteMethod, suffix: string) {
  return (target: object, key: string, des: PropertyDescriptor) => {
    if (!metaKeyIsExist(RouteMetaKey.actions, target)) {
      attachMetadata(RouteMetaKey.actions, [], target);
    }
    fetchMetadata<string[]>(RouteMetaKey.actions, target)!.push(key);
    attachMetadata(RouteMetaKey.suffix, suffix, target, key);
    attachMetadata(RouteMetaKey.method, method, target, key);
  };
}

export function Get(path = "") {
  return createRouterMethod(RouteMethod.GET, path);
}

export function Post(path = "") {
  return createRouterMethod(RouteMethod.POST, path);
}

export function Delete(path = "") {
  return createRouterMethod(RouteMethod.DELETE, path);
}

export function Trace(path = "") {
  return createRouterMethod(RouteMethod.TRACE, path);
}

export function Put(path = "") {
  return createRouterMethod(RouteMethod.PUT, path);
}

export function Options(path = "") {
  return createRouterMethod(RouteMethod.OPTIONS, path);
}
export function Head(path = "") {
  return createRouterMethod(RouteMethod.HEAD, path);
}

export function Connect(path = "") {
  return createRouterMethod(RouteMethod.CONNECT, path);
}
