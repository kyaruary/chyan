import { attachMetadata } from "../../core/MetadataStorage";
import { Constructor } from "../../types/types";
import { RouteMetaKey } from "./metakey";

export function Middlewares(middlewares: Function[]) {
  return (target: Constructor | object, key?: string, desc?: PropertyDescriptor) => {
    attachMetadata(RouteMetaKey.middlewares, middlewares, target, key);
  };
}
