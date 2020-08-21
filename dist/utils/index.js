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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var promises = [];
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.atuoInject = function (include) {
        return __awaiter(this, void 0, void 0, function () {
            var include_path, include_path_1, include_path_1_1, relative_path, abs_path, e_1_1, e_2;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        include_path = include !== null && include !== void 0 ? include : ["/"];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 14, , 15]);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 10, 11, 12]);
                        include_path_1 = __values(include_path), include_path_1_1 = include_path_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!include_path_1_1.done) return [3 /*break*/, 9];
                        relative_path = include_path_1_1.value;
                        abs_path = path_1.default.resolve(__dirname, relative_path);
                        return [4 /*yield*/, fs_1.promises.stat(abs_path)];
                    case 4:
                        if (!(_b.sent()).isFile()) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.DynamicImport(abs_path)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.RecursiveImport(abs_path)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        include_path_1_1 = include_path_1.next();
                        return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (include_path_1_1 && !include_path_1_1.done && (_a = include_path_1.return)) _a.call(include_path_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 12: return [4 /*yield*/, Promise.all(promises)];
                    case 13:
                        _b.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        e_2 = _b.sent();
                        console.log(e_2, "dynamic import failed");
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * *\/contoller
     * ** contoller
     * contollers/ **
     * *Controller
     * @param controller
     */
    Utils.parseControllersPath = function (all) {
        var e_3, _a;
        var controllers = all.split(",");
        var paths = [];
        try {
            for (var controllers_1 = __values(controllers), controllers_1_1 = controllers_1.next(); !controllers_1_1.done; controllers_1_1 = controllers_1.next()) {
                var controller = controllers_1_1.value;
                paths.push(this.handleControllerPath(controller));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (controllers_1_1 && !controllers_1_1.done && (_a = controllers_1.return)) _a.call(controllers_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return paths;
    };
    Utils.handleControllerPath = function (controller) {
        controller = controller.trim();
        return controller;
    };
    Utils.RecursiveImport = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var files, files_1, files_1_1, file, e_4_1;
            var e_4, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.readdir(dir)];
                    case 1:
                        files = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 10, 11, 12]);
                        files_1 = __values(files), files_1_1 = files_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!files_1_1.done) return [3 /*break*/, 9];
                        file = files_1_1.value;
                        return [4 /*yield*/, fs_1.promises.stat(file)];
                    case 4:
                        if (!(_b.sent()).isDirectory()) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.RecursiveImport(path_1.default.resolve(dir, file))];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.DynamicImport(path_1.default.resolve(dir, file))];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        files_1_1 = files_1.next();
                        return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Utils.DynamicImport = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var s, extension, isTsFile;
            return __generator(this, function (_a) {
                s = file.split(".");
                extension = s[s.length - 1];
                isTsFile = extension === "ts" || extension === "tsx";
                if (!isTsFile) {
                    return [2 /*return*/];
                }
                promises.push(Promise.resolve().then(function () { return __importStar(require("" + file)); }));
                return [2 /*return*/];
            });
        });
    };
    return Utils;
}());
exports.Utils = Utils;
