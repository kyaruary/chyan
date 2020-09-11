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
const lib_1 = require("../lib");
const loader_1 = require("../lib/core/loader");
const path_1 = __importDefault(require("path"));
const initializer_1 = require("../lib/core/initializer");
const router_1 = require("../lib/core/router");
!(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const app = lib_1.Chyan.createApplication();
        yield loader_1.loader.load([path_1.default.resolve(__dirname, "controllers")]);
        yield initializer_1.initializer();
        app.useRouter(router_1.RouterStorage.getRouter());
        app.run(8033);
    });
})();
