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
exports.RouterStorage = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const middlewate_storage_1 = require("./middlewate-storage");
const router = new koa_router_1.default();
function add(method, prefix, suffix, callback, argTypes, middlewares, argsFn) {
    const fullPath = generateRouterPath(prefix, suffix);
    router[method.toLowerCase()](fullPath, ...middlewares, (c, next) => __awaiter(this, void 0, void 0, function* () {
        const args = argsFn.map((arg) => arg(c, next));
        const result = yield callback(...args);
        yield middlewate_storage_1.MiddlewaresStorage.interceptor.apply(result, c);
    }));
}
function formatRouter(url) {
    return url === "/" ? url : url.replace(/\/$/, "");
}
function generateRouterPath(prefix, sub_path) {
    return formatRouter(`/${prefix}/${sub_path}`.replace(/[/]{2,}/g, "/"));
}
function getRouter() {
    return router;
}
exports.RouterStorage = {
    add,
    getRouter,
};
