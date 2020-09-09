import KoaRouter from "koa-router";
import { Constructor } from "../interface";
import { RouteMethod } from "../constant/RouteMethods";
declare function add(method: RouteMethod, prefix: string, suffix: string, callback: Function, argTypes: Constructor[], middlewares: Function[], argsFn: Function[]): void;
declare function getRouter(): KoaRouter<any, {}>;
export declare const RouterStorage: {
    add: typeof add;
    getRouter: typeof getRouter;
};
export {};
