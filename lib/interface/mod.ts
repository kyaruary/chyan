import { ArgumentsTypes } from "../constant/ArgumentsTypes";
import { Context } from "koa";
import multer from "@koa/multer";

export interface Pipe {
  validate(argTypes: ArgumentsMetadata[], c: Context): void;
}

export interface Filter {
  catch(e: any, c: Context): void;
}

export interface Interceptor {
  apply(c: Context, data?: any): void;
}

export interface Guard {
  can(c: Context): void;
}

export interface Logger {
  log(c: Context): void;
}

export interface ArgumentsMetadata {
  value?: any;
  field: string | multer.Field[];
  argType: any;
  metaType: ArgumentsTypes;
}
