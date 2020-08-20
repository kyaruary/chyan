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
exports.Habe = void 0;
var koa_body_parser_1 = __importDefault(require("koa-body-parser"));
require("reflect-metadata");
var utils_1 = require("../utils");
var koa_1 = __importDefault(require("koa"));
var metadata_1 = require("./metadata");
var router_1 = require("./router");
var koa_cookie_1 = __importDefault(require("koa-cookie"));
var koa_session_1 = __importDefault(require("koa-session"));
var koa_static_1 = __importDefault(require("koa-static"));
var types_1 = require("../@types/types");
var Uuid = __importStar(require("uuid"));
var Habe = /** @class */ (function () {
    function Habe(app) {
        this.app = app;
        this.middlewares = [];
        this.useStaticServer = false;
        this.staticRoot = ".";
    }
    Habe.createApplication = function () {
        if (this.habe === null) {
            metadata_1.MetaDataStorage.getMetaDataStroage().injectConfig();
            var app = new koa_1.default();
            this.habe = new Habe(app);
        }
        return this.habe;
    };
    Habe.prototype.u = function (m, type) {
        var _a, _b;
        m.prototype.id = (_a = m.prototype.id) !== null && _a !== void 0 ? _a : Uuid.v4();
        var params = (_b = Reflect.getMetadata("design:paramtypes", m)) !== null && _b !== void 0 ? _b : [];
        var args = params.map(function (param) {
            var _a;
            param.prototype.id = (_a = param.prototype.id) !== null && _a !== void 0 ? _a : Uuid.v4();
            return param.prototype.id;
        });
        var des = {
            target: m.prototype.id,
            args: args,
            proto: m,
            priority: args.length,
            type: types_1.InjectorType.Middleware,
            middlewareTypes: type,
        };
        metadata_1.MetaDataStorage.addMiddleware(des);
    };
    Habe.prototype.useGlobalMiddleware = function (middleware) {
        this.u(middleware, types_1.MiddlewareTypes.Middleware);
    };
    Habe.prototype.useGlobalGuard = function (guard) {
        this.u(guard, types_1.MiddlewareTypes.Guard);
    };
    Habe.prototype.useGlobalInterceptor = function (ic) {
        this.u(ic, types_1.MiddlewareTypes.Interceptor);
    };
    Habe.prototype.useGlobalExceptionFilter = function (filter) {
        this.u(filter, types_1.MiddlewareTypes.Filter);
    };
    Habe.prototype.useGlobalPipe = function (pipe) {
        this.u(pipe, types_1.MiddlewareTypes.Pipe);
    };
    Habe.prototype.useStatic = function (root, opts) {
        this.useStaticServer = true;
        this.staticRoot = root;
        this.staticOption = opts;
    };
    Habe.prototype.useLogger = function (logger) {
        this.u(logger, types_1.MiddlewareTypes.Logger);
    };
    Habe.prototype.useMiddleware = function (middleware) {
        this.middlewares.push(middleware);
    };
    Habe.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, SessionConfig, _a, _b, m, router;
            var e_1, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        config = metadata_1.MetaDataStorage.envConfig;
                        metadata_1.MetaDataStorage.resolve();
                        if (!config.controllers) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.Utils.atuoInject()];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2:
                        this.app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
                            var e_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, next()];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        e_2 = _a.sent();
                                        console.log(e_2, "exception filter");
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.keys = ["session"];
                        SessionConfig = {};
                        this.app.use(koa_body_parser_1.default());
                        this.app.use(koa_cookie_1.default());
                        this.app.use(koa_session_1.default(SessionConfig, this.app));
                        try {
                            for (_a = __values(this.middlewares), _b = _a.next(); !_b.done; _b = _a.next()) {
                                m = _b.value;
                                this.app.use(m);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        router = router_1.RouterUtils.getRouter();
                        this.app.use(router.routes()).use(router.allowedMethods());
                        if (this.useStaticServer) {
                            this.app.use(koa_static_1.default(this.staticRoot, this.staticOption));
                        }
                        this.app.listen(config.port, function () {
                            console.log("server is running on  http://localhost:" + config.port);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Habe.habe = null;
    return Habe;
}());
exports.Habe = Habe;
