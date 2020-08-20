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
exports.Controller = void 0;
var metadata_1 = require("../core/metadata");
require("reflect-metadata");
var Uuid = __importStar(require("uuid"));
function Controller(prefix) {
    return function ControllerDecorator(target) {
        var _a, _b;
        var params = (_a = Reflect.getMetadata("design:paramtypes", target)) !== null && _a !== void 0 ? _a : [];
        console.log("controller");
        var args = params.map(function (param) {
            var _a;
            param.prototype.id = (_a = param.prototype.id) !== null && _a !== void 0 ? _a : Uuid.v4();
            return param.prototype.id;
        });
        var cd = {
            target: (_b = target.prototype.id) !== null && _b !== void 0 ? _b : Uuid.v4(),
            proto: target,
            prefix: prefix !== null && prefix !== void 0 ? prefix : "",
            args: args,
        };
        metadata_1.MetaDataStorage.addControllerDescriptor(cd);
    };
}
exports.Controller = Controller;
