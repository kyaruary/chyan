import { MetaDataStorage } from "../core/metadata";
import * as Uuid from "uuid";

export function Middleware(middleware: Function) {
  return function ActionDescriptorDecorator(target: Object, key: string, descriptor: PropertyDescriptor) {
    target.constructor.prototype.id = target.constructor.prototype.id || Uuid.v4();
    MetaDataStorage.attachMiddleware2Action(target.constructor.prototype.id, key, middleware);
  };
}
