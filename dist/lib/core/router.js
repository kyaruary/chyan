"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterUtils = void 0;
const ArgumentsTypes_1 = require("../constant/ArgumentsTypes");
const koa_router_1 = __importDefault(require("koa-router"));
const middleware_storage_1 = require("./middleware-storage");
const multer_1 = __importDefault(require("@koa/multer"));
const router = new koa_router_1.default();
class RouterUtils {
    static add(r) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullPath = this.generateRouterPath(r.prefix, r.actionDescriptor.suffix);
            const time = new Date();
            console.log(`*** [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}/${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:${time.getSeconds()}] 注入路由 ${r.actionDescriptor.type} ${fullPath} ,host: ${r.actionDescriptor.hostName}@${r.actionDescriptor.key}`);
            const method = r.actionDescriptor.type.toLowerCase();
            const middleware = this.getUploadMiddleware(r.args);
            router[method](fullPath, ...middleware, (c, next) => __awaiter(this, void 0, void 0, function* () {
                const { args } = this.injectArugments(c, r, next);
                // valdiate
                const result = yield Reflect.apply(r.actionDescriptor.callback, r.host, [...args]);
                middleware_storage_1.MiddlewareStorage.interceptor.apply(c, result);
            }));
        });
    }
    static formatRouter(url) {
        return url === "/" ? url : url.replace(/\/$/, "");
    }
    static getUploadMiddleware(args) {
        var _a, _b, _c;
        const middleware = [];
        const multerOptions = [];
        // inject files
        for (const arg of args) {
            if (arg.type === ArgumentsTypes_1.ArgumentsTypes.FILE) {
                const upload = multer_1.default((_a = arg.upload) === null || _a === void 0 ? void 0 : _a.options);
                middleware.push(upload.single(arg.field));
                break;
            }
            if (arg.type === ArgumentsTypes_1.ArgumentsTypes.FILES) {
                const upload = multer_1.default((_b = arg.upload) === null || _b === void 0 ? void 0 : _b.options);
                middleware.push(upload.fields(((_c = arg.upload) === null || _c === void 0 ? void 0 : _c.fields) || []));
                break;
            }
        }
        return middleware;
    }
    static generateRouterPath(prefix, sub_path) {
        return this.formatRouter(`/${prefix}/${sub_path}`.replace(/[/]{2,}/g, "/"));
    }
    static injectArugments(c, r, next) {
        var _a;
        const args = [];
        const { session, cookie, query, params } = c;
        const argumentsMetadataArr = [];
        for (const arg of r.args) {
            let object;
            switch (arg.type) {
                case ArgumentsTypes_1.ArgumentsTypes.BODY:
                    object = arg.field ? (_a = c.request.body) === null || _a === void 0 ? void 0 : _a[arg.field] : c.request.body;
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
                    const file = Object.assign({}, c.file);
                    object = file;
                    break;
                case ArgumentsTypes_1.ArgumentsTypes.FILES:
                    object = undefined; // todo
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
