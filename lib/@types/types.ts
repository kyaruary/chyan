import { RouteMethod } from "../constant/RouteMethods";
import { ArgumentsTypes } from "../constant/ArgumentsTypes";
import { IMiddleware, IPipe, IGuard, IInterceptor, IStatic, IFilter, ILogger } from "../interface/mod";
import { Context } from "koa";
import multer from "@koa/multer";
export type Constructor<T = object> = new (...args: any[]) => T;

export type MiddlewareConstructor = Constructor<IMiddleware>;
export type PipeConstructor = Constructor<IPipe>;
export type GuardConstructor = Constructor<IGuard>;
export type InterceptorConstructor = Constructor<IInterceptor>;
export type StaticConstructor = Constructor<IStatic>;
export type FilterConstructor = Constructor<IFilter>;
export type LoggerConstructor = Constructor<ILogger>;

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
};

export type RouterDescriptor = {
  actionDescriptor: ActionDescriptor;
  prefix: string;
  args: ArgumentsDescriptor[];
  host: object;
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
  options?: multer.Options;
};
