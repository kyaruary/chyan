import { attachMetadata } from "../../core/metadata-storage";
import { Constructor } from "../../types/types";
import { RouteMetaKey } from "./share";

export function Middlewares(middlewares: Function[]) {
  return (target: Constructor | object, key?: string, desc?: PropertyDescriptor) => {
    attachMetadata(RouteMetaKey.middlewares, middlewares, target, key);
  };
}
