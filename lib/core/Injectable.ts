import { ChyanMetaKey, DesignMetaKey } from "../constant/metakey";
import { Constructor } from "../types/types";
import { uuid } from "../vendors";
import { attachMetadata, collectInjector, metaKeyIsExist } from "./MetadataStorage";

export function Injectable(callback?: InjectableCallback) {
  return (target: Constructor) => {
    if (!metaKeyIsExist(ChyanMetaKey.id, target)) {
      const id = uuid.v4();
      attachMetadata(ChyanMetaKey.id, id, target);
      collectInjector(id, target);
    }
    if (callback) {
      const { preparing, packing, wiring, done } = (callback(target) ?? {}) as Partial<InjectorLife>;
      typeof preparing === "function" && attachMetadata(ChyanMetaKey.preparing, preparing, target);
      typeof packing === "function" && attachMetadata(ChyanMetaKey.packing, packing, target);
      typeof wiring === "function" && attachMetadata(ChyanMetaKey.wiring, wiring, target);
      typeof done === "function" && attachMetadata(ChyanMetaKey.done, done, target);
    }
  };
}

export type InjectableCallback = (target: Constructor) => Partial<InjectorLife> | void;

export type onIns = (instance: object) => void;

export interface InjectorLife {
  preparing<T>(target: Constructor<T>): void;
  packing<T>(target: Constructor<T>, args: any[]): any;
  wiring<T = object>(target: T, key: string, value: any, type: any): any;
  done<T = object>(target: T): void;
}
