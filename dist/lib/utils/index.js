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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Utils = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const promises = [];
class Utils {
    static atuoInject(include) {
        return __awaiter(this, void 0, void 0, function* () {
            const include_path = include;
            try {
                this.injectViaAbsPath(include_path);
            }
            catch (e) {
                console.log(e, "dynamic import failed");
            }
        });
    }
    static RecursiveImport(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fs_1.promises.readdir(dir);
            for (const file of files) {
                const filePath = path_1.default.resolve(dir, file);
                if ((yield fs_1.promises.stat(filePath)).isDirectory()) {
                    yield this.RecursiveImport(filePath);
                }
                else {
                    yield this.DynamicImport(filePath);
                }
            }
        });
    }
    static DynamicImport(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = file.split(".");
            const extension = s[s.length - 1];
            const isTsFile = extension === "ts" || extension === "tsx";
            if (!isTsFile) {
                return;
            }
            promises.push(Promise.resolve().then(() => __importStar(require(`${file}`))));
        });
    }
    static injectViaAbsPath(includeAbsPath) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const path of includeAbsPath) {
                if (this.isAbsPath(path)) {
                    if ((yield fs_1.promises.stat(path)).isFile()) {
                        yield this.DynamicImport(path);
                    }
                    else {
                        yield this.RecursiveImport(path);
                    }
                }
                else {
                    throw path + "is not absolute path";
                }
            }
            yield Promise.all(promises);
        });
    }
    static isAbsPath(path) {
        const unixReg = /^\//;
        const winReg = /^[a-zA-z]:/;
        return unixReg.test(path) || winReg.test(path);
    }
}
exports.Utils = Utils;
