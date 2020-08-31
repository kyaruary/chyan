/// <reference types="koa-session" />
/// <reference types="node" />
/// <reference types="koa__multer" />
import { RouteMethod } from "../constant/RouteMethods";
import { ArgumentsTypes } from "../constant/ArgumentsTypes";
import { Pipe, Guard, Interceptor, Filter, Logger } from "../interface/mod";
import { Context } from "koa";
import multer from "@koa/multer";
import { IncomingMessage } from "http";
import { SchemaDefinition } from "mongoose";
export declare type Constructor<T = object> = new (...args: any[]) => T;
export declare type PipeConstructor = Constructor<Pipe>;
export declare type GuardConstructor = Constructor<Guard>;
export declare type InterceptorConstructor = Constructor<Interceptor>;
export declare type FilterConstructor = Constructor<Filter>;
export declare type LoggerConstructor = Constructor<Logger>;
export declare type RouterCallback = (c: Context) => any;
export declare type InjectorDescriptor = {
    target: string;
    proto: Constructor;
    priority: number;
    args: string[];
    type: InjectorType;
    middlewareTypes?: MiddlewareTypes;
};
export declare type ControllerDescriptor = {
    target: string;
    proto: Constructor;
    prefix: string;
    args: any[];
};
export declare type ActionDescriptor = {
    suffix: string;
    target: string;
    type: RouteMethod;
    callback: RouterCallback;
    key: string;
    hostName: string;
    argsType: Constructor[];
    middlewares: Function[];
};
export declare type ServiceInstantiation = {
    target: string;
    instance: object;
};
export declare type ArgumentsDescriptor = {
    type: ArgumentsTypes;
    field: string;
    upload?: UploadDescriptor;
    target: string;
    key: string;
    position: number;
};
export declare type EntityDescriptor = {
    name: string;
    target: string;
    schema?: SchemaDefinition;
};
export declare type RouterDescriptor = {
    actionDescriptor: ActionDescriptor;
    prefix: string;
    args: ArgumentsDescriptor[];
    host: object;
    middlewares: Function[];
};
export declare type RouterHandle = (...args: any[]) => any;
export declare type RouterParams = {
    name: string;
    delimiter: string;
    optional: boolean;
    repeat: boolean;
};
export declare type Path = string;
export declare type Record = {
    [key: string]: any;
};
export declare enum InjectorType {
    Service = "service",
    Middleware = "middleware"
}
export declare enum MiddlewareTypes {
    Middleware = "middleware",
    StaticServer = "static-server",
    Guard = "guard",
    Pipe = "pipe",
    Interceptor = "interceptor",
    Filter = "filter",
    Logger = "logger"
}
export declare type FileInfo = {
    fieldname: string;
    originalname: string;
    extension?: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
};
export declare type UploadDescriptor = {
    fields?: multer.Field[];
    options?: UploadOptions;
};
export declare type UploadOptions = {
    dest: string;
    filename: (c: IncomingMessage) => string;
    limit?: number;
};
