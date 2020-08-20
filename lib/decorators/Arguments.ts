import { MetaDataStorage } from "../core/metadata";
import { ArgumentsTypes } from "../constant/ArgumentsTypes";
import * as Uuid from "uuid";

function ArgumentsDecoratorWrapper(type: ArgumentsTypes, field: string = "") {
  return function ArgumentsDecorator(target: Object, key: string, index: number) {
    target.constructor.prototype.id = target.constructor.prototype.id ?? Uuid.v4();
    MetaDataStorage.addArgumentsDescriptor({ type, field, key, target: target.constructor.prototype.id, position: index });
  };
}

export function Body(field?: string) {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.BODY, field);
}

export function Query(field?: string) {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.QUERY, field);
}

export function Params(field?: string) {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.PARAMS, field);
}

export function NextFc() {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.NEXT);
}

export function Res() {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.RES);
}

export function Req() {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.REQ);
}

export function Cookie() {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.COOKIE);
}

export function Session() {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.SESSION);
}

export function File(name: string) {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.FILE, name);
}

export function Files() {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.FILES);
}

export function Ctx() {
  return ArgumentsDecoratorWrapper(ArgumentsTypes.CONTEXT);
}
