/// <reference types="koa-session" />
import { RouteMethod } from "../constant/RouteMethods";
import { ArgumentsTypes } from "../constant/ArgumentsTypes";
import { IMiddleware, IPipe, IGuard, IInterceptor, IStatic, IFilter, ILogger } from "../interface/mod";
import { Context } from "koa";
export declare type Constructor<T = object> = new (...args: any[]) => T;
export declare type MiddlewareConstructor = Constructor<IMiddleware>;
export declare type PipeConstructor = Constructor<IPipe>;
export declare type GuardConstructor = Constructor<IGuard>;
export declare type InterceptorConstructor = Constructor<IInterceptor>;
export declare type StaticConstructor = Constructor<IStatic>;
export declare type FilterConstructor = Constructor<IFilter>;
export declare type LoggerConstructor = Constructor<ILogger>;
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
};
export declare type ServiceInstantiation = {
    target: string;
    instance: object;
};
export declare type ArgumentsDescriptor = {
    type: ArgumentsTypes;
    field: string;
    target: string;
    key: string;
    position: number;
};
export declare type EntityDescriptor = {
    name: string;
    target: string;
};
export declare type RouterDescriptor = {
    actionDescriptor: ActionDescriptor;
    prefix: string;
    args: ArgumentsDescriptor[];
    host: object;
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
