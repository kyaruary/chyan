import RawKoaApplication, { Context, Next } from "koa";

export type Constructor<T = object> = new (...args: any[]) => T;

export type ChyanContext = Context;

export { Middleware } from "koa";

export type ChyanNext = Next;

export { Document, Schema, SchemaOptions, SchemaTypes } from "mongoose";

export type KoaMiddleware<NewStateT = {}, NewCustomT = {}> = RawKoaApplication.Middleware<RawKoaApplication.DefaultState & NewStateT, RawKoaApplication.DefaultContext & NewCustomT>;

export interface ChyanInterceptor {
  transform(c: ChyanContext): void | Promise<void>;
  intercept(body: any, c: ChyanContext): void | Promise<void>;
}

// export interface GlobalPipe {
//   validate(value: any[], types: Function[], c: ChyanContext): void | Promise<void>;
// }

export interface ChyanExceptionFilter {
  catch(e: Error, c: ChyanContext): void | Promise<void>;
}

// export interface ChyanGuard {
//   canActive(c: ChyanContext): void | Promise<void>;
// }

export interface ChyanMiddleware {
  apply(c: ChyanContext, next: ChyanNext): void | Promise<void>;
}
