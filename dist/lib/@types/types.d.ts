import { Context } from "koa";
import { InjectLevel } from "../decorators";
export declare type Constructor = new (...args: any[]) => object;
export declare type RouterCallback = (c: Context) => any;
export declare type InjectorMetadata = {
    id: string;
    target: Constructor;
    args: string[];
    meta?: Record;
    level: InjectLevel;
};
export declare type ActionMetadata = {
    id: string;
    host: string;
    key: string;
    argsType: Constructor[];
    meta?: Record;
};
export declare type ArgumentsMetadata = {
    host: string;
    key: string;
    position: number;
    meta?: Record;
};
export declare type PropertyMetadata = {};
export declare type Record = {
    [key: string]: any;
};
