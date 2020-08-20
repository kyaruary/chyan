import { RouterDescriptor } from "../@types/types";
import KoaRouter from "koa-router";
export declare class RouterUtils {
    static add(r: RouterDescriptor): Promise<void>;
    private static formatRouter;
    private static generateRouterPath;
    private static injectArugments;
    static getRouter(): KoaRouter<any, {}>;
}
