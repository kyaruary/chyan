import { attachMetadata } from "accioo";
import { Constructor } from "../../types/types";
import { RouteMetaKey } from "./metakey";

export function UseMiddlewares(middlewares: Function[]) {
  return (target: Constructor | object, key?: string, desc?: PropertyDescriptor) => {
    attachMetadata(RouteMetaKey.middlewares, middlewares, target, key);
  };
}
