/// <reference types="koa-bodyparser" />
/// <reference types="koa-session" />
import "reflect-metadata";
import Application from "koa";
import serve from "koa-static";
import { MiddlewareConstructor, GuardConstructor, InterceptorConstructor, FilterConstructor, PipeConstructor, LoggerConstructor } from "../@types/types";
export declare class Habe {
    private app;
    private middlewares;
    private useStaticServer;
    private staticOption?;
    private staticRoot;
    private static habe;
    constructor(app: Application);
    static createApplication(): Habe;
    private u;
    useGlobalMiddleware(middleware: MiddlewareConstructor): void;
    useGlobalGuard(guard: GuardConstructor): void;
    useGlobalInterceptor(ic: InterceptorConstructor): void;
    useGlobalExceptionFilter(filter: FilterConstructor): void;
    useGlobalPipe(pipe: PipeConstructor): void;
    useStatic(root: string, opts?: serve.Options): void;
    useLogger(logger: LoggerConstructor): void;
    useMiddleware(middleware: Application.Middleware): void;
    run(): Promise<void>;
}
