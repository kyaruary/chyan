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
class Habe {
    constructor(app) {
        this.app = app;
        this.middlewares = [];
        this.useStaticServer = false;
        this.staticRoot = ".";
    }
    static createApplication() {
        if (this.habe === null) {
            metadata_1.MetaDataStorage.getMetaDataStroage().injectConfig();
            const app = new koa_1.default();
            this.habe = new Habe(app);
        }
        return this.habe;
    }
    u(m, type) {
        m.prototype.id = m.prototype.id ?? Uuid.v4();
        const params = Reflect.getMetadata("design:paramtypes", m) ?? [];
        const args = params.map((param) => {
            param.prototype.id = param.prototype.id ?? Uuid.v4();
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
    useGlobalMiddleware(middleware) {
        this.u(middleware, types_1.MiddlewareTypes.Middleware);
    }
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
    async run() {
        const config = metadata_1.MetaDataStorage.envConfig;
        if (config.controllers) {
            await utils_1.Utils.atuoInject([config.controllers]);
        }
        metadata_1.MetaDataStorage.resolve();
        this.app.use(async (ctx, next) => {
            try {
                await next();
            }
            catch (e) {
                console.log(e, "exception filter");
            }
        });
        this.app.keys = ["session"];
        const SessionConfig = {};
        this.app.use(koa_bodyparser_1.default());
        this.app.use(koa_cookie_1.default());
        this.app.use(koa_session_1.default(SessionConfig, this.app));
        for (const m of this.middlewares) {
            this.app.use(m);
        }
        const router = router_1.RouterUtils.getRouter();
        this.app.use(router.routes()).use(router.allowedMethods());
        if (this.useStaticServer) {
            this.app.use(koa_static_1.default(this.staticRoot, this.staticOption));
        }
        this.app.listen(config.port, () => {
            console.log(`server is running on  http://localhost:${config.port}`);
        });
    }
}
exports.Habe = Habe;
Habe.habe = null;
