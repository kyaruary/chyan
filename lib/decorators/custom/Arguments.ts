import { Next } from "../../interface";
import { Context } from "../../core/Context";
import { createArgumentsDecorator } from "../helper";

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
