import { RouteMethod } from "../constant/RouteMethods";
import { ArgumentsTypes } from "../constant/ArgumentsTypes";
import { Middleware, Pipe, Guard, Interceptor, Filter, Logger } from "../interface/mod";
import { Context } from "koa";
import multer from "@koa/multer";
import { IncomingMessage } from "http";
import { SchemaDefinition } from "mongoose";
export type Constructor<T = object> = new (...args: any[]) => T;

export type MiddlewareConstructor = Constructor<Middleware>;
export type PipeConstructor = Constructor<Pipe>;
export type GuardConstructor = Constructor<Guard>;
export type InterceptorConstructor = Constructor<Interceptor>;
export type FilterConstructor = Constructor<Filter>;
export type LoggerConstructor = Constructor<Logger>;

export type RouterCallback = (c: Context) => any;

export type InjectorDescriptor = {
  target: string;
  proto: Constructor;
  priority: number;
  args: string[];
  type: InjectorType;
  middlewareTypes?: MiddlewareTypes;
};

export type ControllerDescriptor = {
  target: string;
  proto: Constructor;
  prefix: string;
  args: any[];
};

export type ActionDescriptor = {
  suffix: string;
  target: string;
  type: RouteMethod;
  callback: RouterCallback;
  key: string;
  hostName: string;
  argsType: Constructor[];
  middlewares: Function[];
};

export type ServiceInstantiation = {
  target: string;
  instance: object;
};

export type ArgumentsDescriptor = {
  type: ArgumentsTypes;
  field: string;
  upload?: UploadDescriptor;
  target: string;
  key: string;
  position: number;
};

export type EntityDescriptor = {
  // target: typeof Model;
  name: string;
  target: string;
  schema?: SchemaDefinition;
};

export type RouterDescriptor = {
  actionDescriptor: ActionDescriptor;
  prefix: string;
  args: ArgumentsDescriptor[];
  host: object;
  middlewares: Function[];
};

export type RouterHandle = (...args: any[]) => any;

export type RouterParams = { name: string; delimiter: string; optional: boolean; repeat: boolean };

export type Path = string;

export type Record = {
  [key: string]: any;
};

export enum InjectorType {
  Service = "service",
  Middleware = "middleware",
}

export enum MiddlewareTypes {
  Middleware = "middleware",
  StaticServer = "static-server",
  Guard = "guard",
  Pipe = "pipe",
  Interceptor = "interceptor",
  Filter = "filter",
  Logger = "logger",
}

export type FileInfo = {
  fieldname: string;
  originalname: string;
  extension?: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export type UploadDescriptor = {
  fields?: multer.Field[];
  options?: UploadOptions;
};

export type UploadOptions = {
  dest: string;
  filename: (c: IncomingMessage) => string;
  limit?: number;
};
