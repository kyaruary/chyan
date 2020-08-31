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
exports.Uploads = exports.Upload = exports.Ctx = exports.Files = exports.File = exports.Session = exports.Cookie = exports.Req = exports.Res = exports.NextFc = exports.Params = exports.Query = exports.Body = void 0;
const metadata_1 = require("../core/metadata");
const ArgumentsTypes_1 = require("../constant/ArgumentsTypes");
const Uuid = __importStar(require("uuid"));
function ArgumentsDecoratorWrapper(type, field = "", upload) {
    return function ArgumentsDecorator(target, key, index) {
        target.constructor.prototype.id = target.constructor.prototype.id || Uuid.v4();
        metadata_1.MetaDataStorage.addArgumentsDescriptor({ type, field, key, target: target.constructor.prototype.id, position: index, upload });
    };
}
function Body(field) {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.BODY, field);
}
exports.Body = Body;
function Query(field) {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.QUERY, field);
}
exports.Query = Query;
function Params(field) {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.PARAMS, field);
}
exports.Params = Params;
function NextFc() {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.NEXT);
}
exports.NextFc = NextFc;
function Res() {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.RES);
}
exports.Res = Res;
function Req() {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.REQ);
}
exports.Req = Req;
function Cookie() {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.COOKIE);
}
exports.Cookie = Cookie;
function Session() {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.SESSION);
}
exports.Session = Session;
function File(name) {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.FILE, name);
}
exports.File = File;
function Files(field) {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.FILES, field);
}
exports.Files = Files;
function Ctx() {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.CONTEXT);
}
exports.Ctx = Ctx;
function Upload(name, options) {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.FILE, name, { options });
}
exports.Upload = Upload;
function Uploads(fields, options) {
    return ArgumentsDecoratorWrapper(ArgumentsTypes_1.ArgumentsTypes.FILES, "", { fields, options });
}
exports.Uploads = Uploads;
