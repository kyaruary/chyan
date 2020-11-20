import { attachMetadata, fetchMetadata } from "accioo";
import { ChyanContext, ChyanNext, Constructor } from "../../types";
import { RouteMetaKey } from "./metakey";

export function Body(field?: string, pipe?: Constructor<ChyanPipe>) {
  return createArgumentsDecorator((c: ChyanContext) => (field ? c.request.body[field] : c.request.body), pipe);
}

export function Query(field?: string, pipe?: Constructor<ChyanPipe>) {
  return createArgumentsDecorator((c: ChyanContext) => (field ? c.query[field] : c.query), pipe);
}

export function Params(field?: string, pipe?: Constructor<ChyanPipe>) {
  return createArgumentsDecorator((c: ChyanContext) => (field ? c.params[field] : c.params), pipe);
}

export function Next() {
  return createArgumentsDecorator((c: ChyanContext, next: ChyanNext) => next);
}

export function Res() {
  return createArgumentsDecorator((c: ChyanContext) => c.response);
}

export function Req() {
  return createArgumentsDecorator((c: ChyanContext) => c.request);
}

export function Cookie() {
  return createArgumentsDecorator((c: ChyanContext) => c.cookies);
}

export function Session() {
  return createArgumentsDecorator((c: ChyanContext) => c.session);
}

export function Ctx() {
  return createArgumentsDecorator((c: ChyanContext) => c);
}

export function Upload() {
  return createArgumentsDecorator((c: ChyanContext) => c.file);
}

export function Uploads() {
  return createArgumentsDecorator((c: ChyanContext) => c.files);
}

export type CreateArgumentsFunction = (c: ChyanContext, next: ChyanNext) => any;

export function createArgumentsDecorator(callback: CreateArgumentsFunction, pipe?: Constructor<ChyanPipe>) {
  return (target: object, key: string, index: number) => {
    if (!fetchMetadata(RouteMetaKey.args, target, key)) {
      attachMetadata(RouteMetaKey.args, [], target, key);
    }
    fetchMetadata<ArgsValueMetadata[]>(RouteMetaKey.args, target, key)?.push({ useValue: callback, pipe, index });
  };
}

export type PipeFunction = (value: any, type: any) => any;

export interface ArgsValueMetadata {
  useValue: CreateArgumentsFunction;
  pipe?: Constructor<ChyanPipe>;
  index: number;
}

export interface ArgsMetadata extends ArgsValueMetadata {
  metatype: any;
}

export interface ChyanPipe {
  validate(): void;
}
