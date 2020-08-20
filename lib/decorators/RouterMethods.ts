import { MetaDataStorage } from "../core/metadata";
import { RouteMethod } from "../constant/RouteMethods";
import * as Uuid from "uuid";
import { Path, Constructor } from "../@types/types";

export function Get(path?: Path) {
  return RouterMethodsFactory(RouteMethod.GET)(path);
}

export function Post(path?: Path) {
  return RouterMethodsFactory(RouteMethod.POST)(path);
}

export function Delete(path?: Path) {
  return RouterMethodsFactory(RouteMethod.DELETE)(path);
}

export function Trace(path?: Path) {
  return RouterMethodsFactory(RouteMethod.TRACE)(path);
}

export function Put(path?: Path) {
  return RouterMethodsFactory(RouteMethod.PUT)(path);
}

export function Options(path?: Path) {
  return RouterMethodsFactory(RouteMethod.OPTIONS)(path);
}
export function Head(path?: Path) {
  return RouterMethodsFactory(RouteMethod.HEAD)(path);
}

export function Connect(path?: Path) {
  return RouterMethodsFactory(RouteMethod.CONNECT)(path);
}

function RouterMethodsFactory(type: RouteMethod) {
  return function RouterMethods(path: Path = "") {
    return function GetDecoratorWrapper(target: Object, key: string, descriptor: PropertyDescriptor) {
      const argsType = Reflect.getMetadata("design:paramtypes", target, key) as Constructor[];
      // save request method, callback, sub router and target into metadata storage;
      target.constructor.prototype.id = target.constructor.prototype.id ?? Uuid.v4();
      MetaDataStorage.addActionDescriptor({
        target: target.constructor.prototype.id,
        callback: descriptor.value,
        type,
        key,
        suffix: path,
        hostName: target.constructor.name,
        argsType: argsType,
      });
    };
  };
}
