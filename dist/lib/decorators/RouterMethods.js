"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = exports.Head = exports.Options = exports.Put = exports.Trace = exports.Delete = exports.Post = exports.Get = void 0;
const metadata_1 = require("../core/metadata");
const RouteMethods_1 = require("../constant/RouteMethods");
const Uuid = __importStar(require("uuid"));
function Get(path) {
    return RouterMethodsFactory(RouteMethods_1.RouteMethod.GET)(path);
}
exports.Get = Get;
function Post(path) {
    return RouterMethodsFactory(RouteMethods_1.RouteMethod.POST)(path);
}
exports.Post = Post;
function Delete(path) {
    return RouterMethodsFactory(RouteMethods_1.RouteMethod.DELETE)(path);
}
exports.Delete = Delete;
function Trace(path) {
    return RouterMethodsFactory(RouteMethods_1.RouteMethod.TRACE)(path);
}
exports.Trace = Trace;
function Put(path) {
    return RouterMethodsFactory(RouteMethods_1.RouteMethod.PUT)(path);
}
exports.Put = Put;
function Options(path) {
    return RouterMethodsFactory(RouteMethods_1.RouteMethod.OPTIONS)(path);
}
exports.Options = Options;
function Head(path) {
    return RouterMethodsFactory(RouteMethods_1.RouteMethod.HEAD)(path);
}
exports.Head = Head;
function Connect(path) {
    return RouterMethodsFactory(RouteMethods_1.RouteMethod.CONNECT)(path);
}
exports.Connect = Connect;
function RouterMethodsFactory(type) {
    return function RouterMethods(path = "") {
        return function ActionDescriptorDecorator(target, key, descriptor) {
            const argsType = Reflect.getMetadata("design:paramtypes", target, key);
            // save request method, callback, sub router and target into metadata storage;
            target.constructor.prototype.id = target.constructor.prototype.id || Uuid.v4();
            metadata_1.MetaDataStorage.addActionDescriptor({
                target: target.constructor.prototype.id,
                callback: descriptor.value,
                type,
                key,
                suffix: path,
                hostName: target.constructor.name,
                argsType: argsType,
                middlewares: [],
            });
        };
    };
}
