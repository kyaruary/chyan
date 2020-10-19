import { Constructor } from "../types/types";
import "reflect-metadata";
import { PriorityList } from "../utils/PriorityList";
import { ChyanMetaKey, DesignMetaKey } from "../constant/metakey";
import { chyanLogger } from "../utils/chyanlog";
import { isClass } from "../utils/CheckClassType";

const metadataGC: Function[] = [];

const metadataStorage = new Map<string, Constructor>();

const sealMetadataKey = Symbol("seal");

export function pushMetadataGCFunction(fn: Function) {
  metadataGC.push(fn);
}
const defineMetadata = Reflect.defineMetadata.bind(Reflect);

Reflect.defineMetadata = function (...args: any[]) {
  const isSeal = fetchMetadata(sealMetadataKey, args[2]);
  //@ts-ignore
  !isSeal && defineMetadata(...args);
};

export function destory() {
  for (const fn of metadataGC) {
    typeof fn === "function" && fn();
  }
  metadataStorage.clear();
}

export function collectInjector(id: string, target: Constructor) {
  if (isClass(target)) {
    !metadataStorage.get(id) && metadataStorage.set(id, target);
    return true;
  }
  return false;
  // Reflect.defineMetadata(DesignMetaKey.paramTypes, Reflect.getMetadata(DesignMetaKey.paramTypes, target), transferConstructor2Object(target));
}

//done
export function fetchMetadata<T = any>(metaKey: string | Symbol, target: Constructor): T | null;
export function fetchMetadata<T = any>(metaKey: string | Symbol, target: object): T | null;
export function fetchMetadata<T = any>(metaKey: string | Symbol, target: object, key: string | symbol): T | null;
export function fetchMetadata<T = any>(metaKey: string | Symbol, target: Constructor, key: string | symbol): T | null;
export function fetchMetadata<T = any>(metaKey: string | Symbol, target: object | Constructor, key?: symbol | string): T | null {
  checkMetaKeyIsValid(metaKey);
  if (metaKey === DesignMetaKey.paramTypes && !key) {
    return Reflect.getMetadata(metaKey, target, key as any);
  }
  const ot = transferConstructor2Object(target);
  return (Reflect.getMetadata(metaKey, ot, key as any) as T) ?? null;
}

export function attachMetadata(metaKey: string, value: any, target: Constructor): void;
export function attachMetadata(metaKey: string, value: any, target: object): void;
export function attachMetadata(metaKey: string, value: any, target: object, key: string): void;
export function attachMetadata(metaKey: string, value: any, target: Constructor, key: string): void;
export function attachMetadata(metaKey: string, value: any, target: object | Constructor, key?: string): void;
export function attachMetadata(metaKey: string, value: any, target: object | Constructor, key?: string) {
  checkMetaKeyIsValid(metaKey);
  const ot = transferConstructor2Object(target);

  const isSeal = fetchMetadata(sealMetadataKey, ot);

  if (isSeal) {
    return;
  }
  if (metaKeyIsExist(metaKey, ot, key)) {
    chyanLogger.warn(`MetaKey: ${metaKey} already existed, it will be coverd by value: ${value}`);
  } else {
    pushMetadataGCFunction(() => deleteMetaKey(metaKey, ot, key));
  }
  Reflect.defineMetadata(metaKey, value, ot, key as any);
}

function checkMetaKeyIsValid(metaKey: string | Symbol) {
  if (metaKey instanceof Symbol || typeof metaKey === "symbol") {
    return;
  }
  if (typeof metaKey === "string" && metaKey.split(":").length !== 2) {
    throw `Not Valid MetaKey: ${metaKey}, use format like 'prefix:key' please`;
  }
}

export function sealMetadata(target: Constructor<object>) {
  Reflect.defineMetadata(sealMetadataKey, true, target);
}

/**
 * 检查meta key是否存在
 * @param metaKey
 * @param target
 * @param key
 */
export function metaKeyIsExist(metaKey: string, target: object, key?: string | symbol): boolean {
  return key ? fetchMetadata(metaKey, target, key) !== null : fetchMetadata(metaKey, target) !== null;
}

/**
 * 删除meta key
 * @param metaKey
 * @param target
 * @param key
 */
function deleteMetaKey(metaKey: string, target: object, key?: string): void {
  key ? Reflect.deleteMetadata(metaKey, target, key) : Reflect.deleteMetadata(metaKey, target);
}

export function metadatas() {
  const list: PriorityList<InjectorMetadata> = new PriorityList();
  for (const [id, target] of metadataStorage) {
    const argsTypes = fetchMetadata<Constructor[]>(DesignMetaKey.paramTypes, target) ?? [];
    const args_id = argsTypes.map((arg) => {
      if (!metaKeyIsExist(ChyanMetaKey.id, target)) throw `Injected Params ${arg.name} does not have a deocrator]`;
      return fetchMetadata<string>(ChyanMetaKey.id, arg)!;
    });
    list.enqueue({ id, argsTypes, args_id, target }, argsTypes.length);
  }
  return list;
}

function transferConstructor2Object(target: object | Constructor): object {
  if (typeof target === "function") {
    return target.prototype;
  }
  return target;
}

export interface InjectorMetadata {
  id: string;
  args_id: string[];
  argsTypes: Constructor[];
  target: Constructor;
}
