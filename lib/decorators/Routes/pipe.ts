import { attachMetadata } from "../../core/MetadataStorage";
import { Constructor } from "../../types/types";
import { RouteMetaKey } from "./metakey";

export function Pipe(pipe: Function) {
  return (target: Constructor | object, key?: string, desc?: PropertyDescriptor) => {
    attachMetadata(RouteMetaKey.pipe, pipe, target, key);
  };
}
