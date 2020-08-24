import { ArgumentsTypes } from "../constant/ArgumentsTypes";
import { Context } from "koa";
import multer from "@koa/multer";
export interface IMiddleware {
  apply(): void;
}

export interface IPipe {
  validate(argTypes: ArgumentsMetadata[], c: Context): void;
}

export interface IFilter {
  catch(e: any, c: Context): void;
}

export interface IStatic {
  apply(c: Context): boolean | Promise<boolean>;
}

export interface IInterceptor {
  apply(c: Context, data?: any): void;
}

export interface IGuard {
  can(c: Context): void;
}

export interface ILogger {
  log(c: Context): void;
}

export interface ArgumentsMetadata {
  value?: any;
  field: string | multer.Field[];
  argType: any;
  metaType: ArgumentsTypes;
}
