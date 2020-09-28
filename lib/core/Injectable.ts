import { Constructor } from "..";
import { ChyanMetaKey, DesignMetaKey } from "../constant/symbol";
import { uuid } from "../vendors";
import { attachMetadata, collectInjector, metaKeyIsExist } from "./metadata-storage";

export function Injectable(callback?: InjectableCallback) {
  return (target: Constructor) => {
    if (!metaKeyIsExist(ChyanMetaKey.id, target)) {
      const id = uuid.v4();
      attachMetadata(ChyanMetaKey.id, id, target);
      collectInjector(id, target);
    }
    if (callback) {
      const { beforeIns, onIns, afterIns } = (callback(target) ?? {}) as Partial<InjectorLife>;
      beforeIns && attachMetadata(ChyanMetaKey.beforeIns, beforeIns, target);
      onIns && attachMetadata(ChyanMetaKey.onIns, onIns, target);
      afterIns && attachMetadata(ChyanMetaKey.afterIns, afterIns, target);
    }
  };
}

export type InjectableCallback = (target: Constructor) => Partial<InjectorLife> | void;

export type onIns = (instance: object) => void;

export interface InjectorLife {
  beforeIns(): void; //改变metadata的最后时间
  onIns(target: Constructor, args: object[]): object | void; // 提供实例化信息， 返回一个其他对象替代本来应该实例的对象
  afterIns(instance: object): void; // 对实例化对对象进行其他操作
}
