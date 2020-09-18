import { Constructor } from "../..";
import "reflect-metadata";
import { idSymbol } from "../../constant/symbol";

export function fetchCustomMetadata<T>(target: object, metaKey: Symbol): T;
export function fetchCustomMetadata<T>(target: object, key: string, metaKey: Symbol): T;

export function fetchCustomMetadata<T>(target: object, key: Symbol | string, metaKey?: Symbol): T {
  if (metaKey && key instanceof String) {
    return Reflect.getMetadata(metaKey, target, key as string) as T;
  } else if (!metaKey && key instanceof Symbol) {
    return Reflect.getMetadata(key, target) as T;
  }
  throw "can not fetch metadata from target:" + target;
}

export function fetchInjectableMetadata(target: object) {
  return {
    id: Reflect.getMetadata(idSymbol, target),
    args: (Reflect.getMetadata("design:paramtypes", target) as Constructor[]) ?? [],
  };
}

export function fetchActionMetadata(target: object, key: string) {
  return {
    args: (Reflect.getMetadata("design:paramtypes", target, key) as Constructor[]) ?? [],
  };
}
