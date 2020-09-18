import { Context, Next } from "koa";
import { attachMetadata, fetchMetadata } from "../../core/metadata-storage";
import { RouteMetaKey } from "./share";

export function Body(field?: string) {
  return createArgumentsDecorator((c: Context) => (field ? c.request.body[field] : c.request.body));
}

export function Query(field?: string) {
  return createArgumentsDecorator((c: Context) => (field ? c.query[field] : c.query));
}

export function Params(field?: string) {
  return createArgumentsDecorator((c: Context) => (field ? c.params[field] : c.params));
}

export function NextFn() {
  return createArgumentsDecorator((c: Context, next: Next) => next);
}

export function Res() {
  return createArgumentsDecorator((c: Context) => c.response);
}

export function Req() {
  return createArgumentsDecorator((c: Context) => c.request);
}

export function Cookie() {
  return createArgumentsDecorator((c: Context) => c.cookies);
}

export function Session() {
  return createArgumentsDecorator((c: Context) => c.session);
}

export function Ctx() {
  return createArgumentsDecorator((c: Context) => c);
}

export function Upload() {
  return createArgumentsDecorator((c: Context) => c.file);
}

export function Uploads() {
  return createArgumentsDecorator((c: Context) => c.files);
}

export type ArgumentsCreatedFunction = (c: Context, next: Next) => any;

export function createArgumentsDecorator(callback: ArgumentsCreatedFunction) {
  return (target: object, key: string, index: number) => {
    if (!fetchMetadata(RouteMetaKey.args, target, key)) {
      attachMetadata(RouteMetaKey.args, [], target, key);
    }
    fetchMetadata<Function[]>(RouteMetaKey.args, target, key)?.push(callback);
  };
}
