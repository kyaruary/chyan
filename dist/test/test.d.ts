/// <reference types="koa" />
import { Filter, Logger, Context, Next, Interceptor, FileInfo } from "../lib";
export declare class Hello {
    get(next: Next): Promise<string>;
    post(avatar: FileInfo, ctx: Context): void;
}
export declare class HttpExceptionFilter implements Filter {
    catch(error: any, ctx: Context): void;
}
export declare class MyLogger implements Logger {
    private queue;
    log(ctx: Context): Promise<void>;
    write2File(): Promise<void>;
}
export declare class MyInterceptor implements Interceptor {
    apply(c: Context, data: any): void;
}
