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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habe = void 0;
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
require("reflect-metadata");
const utils_1 = require("../utils");
const koa_1 = __importDefault(require("koa"));
const metadata_1 = require("./metadata");
const router_1 = require("./router");
const koa_cookie_1 = __importDefault(require("koa-cookie"));
const koa_session_1 = __importDefault(require("koa-session"));
const koa_static_1 = __importDefault(require("koa-static"));
const types_1 = require("../@types/types");
const Uuid = __importStar(require("uuid"));
const middleware_storage_1 = require("./middleware-storage");
class Habe {
    constructor(app) {
        this.app = app;
        this.middlewares = [];
        this.useStaticServer = false;
        this.staticRoot = ".";
    }
    static createApplication(appConfig) {
        if (this.habe === null) {
            this.initAppConfig(appConfig);
            const app = new koa_1.default();
            this.habe = new Habe(app);
        }
        return this.habe;
    }
    static initAppConfig(appConfig) {
        if (appConfig) {
            Object.assign(this.appConfig, appConfig);
        }
        Object.freeze(this.appConfig);
    }
    u(m, type) {
        m.prototype.id = m.prototype.id || Uuid.v4();
        const params = Reflect.getMetadata("design:paramtypes", m) || [];
        const args = params.map((param) => {
            param.prototype.id = param.prototype.id || Uuid.v4();
            return param.prototype.id;
        });
        const des = {
            target: m.prototype.id,
            args: args,
            proto: m,
            priority: args.length,
            type: types_1.InjectorType.Middleware,
            middlewareTypes: type,
        };
        metadata_1.MetaDataStorage.addMiddleware(des);
    }
    // useGlobalMiddleware(middleware: MiddlewareConstructor) {
    //   this.u(middleware, MiddlewareTypes.Middleware);
    // }
    useGlobalGuard(guard) {
        this.u(guard, types_1.MiddlewareTypes.Guard);
    }
    useGlobalInterceptor(ic) {
        this.u(ic, types_1.MiddlewareTypes.Interceptor);
    }
    useGlobalExceptionFilter(filter) {
        this.u(filter, types_1.MiddlewareTypes.Filter);
    }
    useGlobalPipe(pipe) {
        this.u(pipe, types_1.MiddlewareTypes.Pipe);
    }
    useStatic(root, opts) {
        this.useStaticServer = true;
        this.staticRoot = root;
        this.staticOption = opts;
    }
    useLogger(logger) {
        this.u(logger, types_1.MiddlewareTypes.Logger);
    }
    useMiddleware(middleware) {
        this.middlewares.push(middleware);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = metadata_1.MetaDataStorage.envConfig;
            if (Habe.appConfig.controllers) {
                const c = [];
                yield utils_1.Utils.atuoInject(c.concat(Habe.appConfig.controllers));
            }
            yield metadata_1.MetaDataStorage.resolve();
            this.app.proxy = Habe.appConfig.proxy;
            this.app.keys = ["session"];
            const SessionConfig = {};
            this.app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield next();
                }
                catch (e) {
                    if (middleware_storage_1.MiddlewareStorage.filters.length === 0) {
                        throw e;
                    }
                    for (const filter of middleware_storage_1.MiddlewareStorage.filters) {
                        if (!ctx.respond)
                            filter.catch(e, ctx);
                    }
                }
                finally {
                    for (const looger of middleware_storage_1.MiddlewareStorage.loggers) {
                        looger.log(ctx);
                    }
                }
            }));
            for (const m of this.middlewares) {
                this.app.use(m);
            }
            this.app.use(koa_bodyparser_1.default());
            this.app.use(koa_cookie_1.default());
            this.app.use(koa_session_1.default(SessionConfig, this.app));
            const router = router_1.RouterUtils.getRouter();
            this.app.use(router.routes()).use(router.allowedMethods());
            if (this.useStaticServer) {
                this.app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
                    ctx.isStatic = true;
                    yield next();
                }));
                this.app.use(koa_static_1.default(this.staticRoot, this.staticOption));
            }
            this.app.use(() => {
                throw { code: 404, msg: "Not Found!" };
            });
            this.app.listen(config.port, () => {
                console.log(`server is running on  http://0.0.0.0:${config.port}`);
            });
        });
    }
}
exports.Habe = Habe;
Habe.appConfig = {
    sessionConfig: {},
    bodyParserConfig: {},
    cookieConfig: {},
    proxy: false,
};
Habe.habe = null;
metadata_1.MetaDataStorage.getMetaDataStroage().injectEnvConfig();
Habe.envConfig = metadata_1.MetaDataStorage.envConfig;
