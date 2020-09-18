import { MetadataStorage } from ".";
/**
 * @author kyaruary
 * 存放依赖收集的元信息
 * 单例模式
 * 收集四种种类型元信息（只有第一次的信息会被添加）
 * 1. 类装饰器的元信息
 *    类唯一标识符：id
 *    类构造器方法
 *    类构造器参数信息
 *    附加中间件
 * 2. 方法装饰器元信息
 *    路由装饰器
 *    路由中间件装饰器
 * 3. 属性装饰器元信息
 *    属性注入装饰器
 * 4. 参数装饰器
 *    构造函数的参数
 *    action参数
 */
import { ArgumentsMetadata, Constructor } from "../../types/types";
import { InjectLevel } from "../../decorators";

const storage: MetadataStorage = {
  injectorMetadataMap: new Map(),
  actionMetadataMap: new Map(),
  argumentMetadataMap: new Map(),
  propertyMetadataMap: new Map(),
};

const metadataGC: Function[] = [];

export function addMetadataGC(fn: Function) {
  metadataGC.push(fn);
}

export function destory() {
  for (const fn of metadataGC) {
    typeof fn === "function" && fn();
  }
}

export const _metadataStorage = new Map<string, Constructor>();

// 收集类基础元信息
export function collectInjectableMetadata(id: string, target: Constructor, args: string[], level: InjectLevel) {
  storage.injectorMetadataMap.set(id, { id, target, args, level, meta: {} });
}

// 收集参数基础元信息
export function collectArgumentMetadata(host: string, id: string, meta: ArgumentsMetadata) {
  if (!storage.argumentMetadataMap.has(host)) {
    storage.argumentMetadataMap.set(host, new Map());
  }
  meta.meta ??= {};
  storage.argumentMetadataMap.get(host)!.set(id, meta);
}

// 收集方法基础元信息
export function collectActionMetadata(host: string, id: string, key: string, argsType: Constructor[]) {
  if (!storage.actionMetadataMap.has(host)) {
    storage.actionMetadataMap.set(host, new Map());
  }
  storage.actionMetadataMap.get(host)!.set(id, { key, id, argsType, host, meta: {} });
}

// 收集属性基础元信息
export function coolectPropertyMetadata() {}

// 添加方法自定义元信息
export function attachActionMetadata(host: string, id: string, meta: any) {
  Object.assign(storage.actionMetadataMap.get(host)?.get(id)?.meta, meta);
}

// 添加类自定义元信息
export function attachInjectorMetadata(id: string, meta: any) {
  Object.assign(storage.injectorMetadataMap.get(id)?.meta, meta);
}

// 添加参数自定义元信息
export function attachArgumentMetadata(host: string, id: string, meta: any) {
  Object.assign(storage.argumentMetadataMap.get(host)?.get(id)?.meta, meta);
}

// 添加自定义属性元信息
export function attachPropertyMetadata() {}

// 判断该类的是否以及存在
export function hasInjectorMetadata(id: string): boolean {
  return storage.injectorMetadataMap.has(id);
}

//判断该参数元信息是否已经存在
export function hasArgumentMetadata(host: string, id: string): boolean {
  if (storage.argumentMetadataMap.has(host)) {
    return !!storage.argumentMetadataMap.get(host)?.has(id);
  }
  return false;
}

// 判断该方法元信息是否存在
export function hasActionMetadata(host: string, id: string): boolean {
  if (storage.actionMetadataMap.has(host)) {
    return storage.actionMetadataMap.get(host)!.has(id);
  }
  return false;
}

// todo 判断属性元信息是否存在
export function hasPropertyMetadata(): boolean {
  return false;
}

// 获取元信息
export function getMetadata() {
  return storage;
}
