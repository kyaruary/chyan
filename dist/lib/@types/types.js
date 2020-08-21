"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareTypes = exports.InjectorType = void 0;
var InjectorType;
(function (InjectorType) {
    InjectorType["Service"] = "service";
    InjectorType["Middleware"] = "middleware";
})(InjectorType = exports.InjectorType || (exports.InjectorType = {}));
var MiddlewareTypes;
(function (MiddlewareTypes) {
    MiddlewareTypes["Middleware"] = "middleware";
    MiddlewareTypes["StaticServer"] = "static-server";
    MiddlewareTypes["Guard"] = "guard";
    MiddlewareTypes["Pipe"] = "pipe";
    MiddlewareTypes["Interceptor"] = "interceptor";
    MiddlewareTypes["Filter"] = "filter";
    MiddlewareTypes["Logger"] = "logger";
})(MiddlewareTypes = exports.MiddlewareTypes || (exports.MiddlewareTypes = {}));
