/// <reference types="koa__multer" />
/// <reference types="koa-bodyparser" />
/// <reference types="koa-session" />
import "reflect-metadata";
import Application from "koa";
import serve from "koa-static";
import { MiddlewareConstructor, GuardConstructor, InterceptorConstructor, FilterConstructor, PipeConstructor, LoggerConstructor } from "../@types/types";
import { EnvConfig } from "./EnvConfig";
import multer from "@koa/multer";
export interface AppConfig {
    sessionConfig?: any;
    bodyParserConfig?: any;
    cookieConfig?: any;
    proxy?: boolean;
    multerConfig?: multer.Options;
    controllers?: string[] | string;
}
export declare class Habe {
    private app;
    private middlewares;
    private useStaticServer;
    private staticOption?;
    private staticRoot;
    static appConfig: AppConfig;
    static envConfig: EnvConfig;
    private static habe;
    constructor(app: Application);
    static createApplication(appConfig?: AppConfig): Habe;
    private static initAppConfig;
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
