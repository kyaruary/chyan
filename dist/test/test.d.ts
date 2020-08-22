/// <reference types="koa-session" />
import { IFilter, ILogger } from "../lib";
import { Context } from "koa";
export declare class Hello {
    get(): string;
    post(body: any): string;
}
export declare class HttpExceptionFilter implements IFilter {
    catch(error: any, ctx: Context): void;
}
export declare class Logger implements ILogger {
    private queue;
    log(ctx: Context): Promise<void>;
    write2File(): Promise<void>;
}
