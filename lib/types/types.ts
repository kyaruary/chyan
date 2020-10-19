import { Context, Next } from "koa";

export type Constructor<T = object> = new (...args: any[]) => T;

export type ChyanContext = Context;

export type ChyanNext = Next;

export { Document, Schema, SchemaOptions, SchemaTypes } from "mongoose";
