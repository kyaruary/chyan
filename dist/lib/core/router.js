"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterUtils = void 0;
const ArgumentsTypes_1 = require("../constant/ArgumentsTypes");
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
class RouterUtils {
    static async add(r) {
        const fullPath = this.generateRouterPath(r.prefix, r.actionDescriptor.suffix);
        const time = new Date();
        console.log(`*** [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}/${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:${time.getSeconds()}] 注入路由 ${fullPath} ,host: ${r.actionDescriptor.hostName}@${r.actionDescriptor.key}`);
        const method = r.actionDescriptor.type.toLowerCase();
        router[method](fullPath, async (c, next) => {
            const { args } = this.injectArugments(c, r, next);
            // valdiate
            const result = await Reflect.apply(r.actionDescriptor.callback, r.host, [...args]);
            if (result !== undefined) {
                c.body = result;
            }
        });
    }
    static formatRouter(url) {
        return url === "/" ? url : url.replace(/\/$/, "");
    }
    static generateRouterPath(prefix, sub_path) {
        return this.formatRouter(`/${prefix}/${sub_path}`.replace(/[/]{2,}/g, "/"));
    }
    static injectArugments(c, r, next) {
        const args = [];
        const { body, session, cookie, query, params } = c;
        const argumentsMetadataArr = [];
        for (const arg of r.args) {
            let object;
            switch (arg.type) {
                case ArgumentsTypes_1.ArgumentsTypes.BODY:
                    object = arg.field ? body[arg.field] : body;
                    break;
                case ArgumentsTypes_1.ArgumentsTypes.COOKIE:
                    object = cookie;
                    break;
                case ArgumentsTypes_1.ArgumentsTypes.PARAMS:
                    object = arg.field ? params[arg.field] : params;
                    break;
                case ArgumentsTypes_1.ArgumentsTypes.QUERY:
                    object = arg.field ? query[arg.field] : query;
                    break;
                case ArgumentsTypes_1.ArgumentsTypes.REQ:
                    object = c.req;
                    break;
                case ArgumentsTypes_1.ArgumentsTypes.SESSION:
                    object = session;
                    break;
                case ArgumentsTypes_1.ArgumentsTypes.CONTEXT:
                    object = c;
                    break;
                case ArgumentsTypes_1.ArgumentsTypes.NEXT:
                    object = next;
                    break;
                case ArgumentsTypes_1.ArgumentsTypes.FILE:
                    object = next; // todo
                    break;
                case ArgumentsTypes_1.ArgumentsTypes.FILES:
                    object = next; // todo
                    break;
                default:
                    console.error("arguments can not find type,", arg.type);
                    break;
            }
            args[arg.position] = object;
            argumentsMetadataArr.push({ value: object, argType: r.actionDescriptor.argsType[arg.position], metaType: arg.type, field: arg.field });
        }
        return { args, argumentsMetadataArr };
    }
    static getRouter() {
        return router;
    }
}
exports.RouterUtils = RouterUtils;
