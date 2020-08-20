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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaDataStorage = void 0;
var types_1 = require("../@types/types");
var PriorityList_1 = require("../utils/PriorityList");
var dotenv_1 = require("dotenv");
var EnvConfig_1 = require("./EnvConfig");
var Uuid = __importStar(require("uuid"));
var router_1 = require("./router");
var MetaDataStorage = /** @class */ (function () {
    function MetaDataStorage() {
        // descriptor metadata storage
        // routesMap: RouterMap = new Map();
        this.serviceDescriptors = new PriorityList_1.PriorityList();
        this.controllerDescriptors = [];
        this.actionDescriptors = new Map();
        this.argumentsDescriptors = new Map();
        this.entityDescriptors = [];
        // instantiation storage
        this.serviceInstantiationMap = new Map();
    }
    MetaDataStorage.getMetaDataStroage = function () {
        if (!MetaDataStorage.instacne) {
            MetaDataStorage.instacne = new MetaDataStorage();
        }
        return MetaDataStorage.instacne;
    };
    MetaDataStorage.addServiceDescriptor = function (sd) {
        MetaDataStorage.getMetaDataStroage().serviceDescriptors.enqueue(sd);
    };
    MetaDataStorage.addControllerDescriptor = function (cd) {
        MetaDataStorage.getMetaDataStroage().controllerDescriptors.push(cd);
    };
    MetaDataStorage.addActionDescriptor = function (rmd) {
        var _a;
        var prev = (_a = MetaDataStorage.getMetaDataStroage().actionDescriptors.get(rmd.target)) !== null && _a !== void 0 ? _a : [];
        MetaDataStorage.getMetaDataStroage().actionDescriptors.set(rmd.target, __spread(prev, [rmd]));
    };
    MetaDataStorage.addArgumentsDescriptor = function (ad) {
        var _a;
        var prev = (_a = this.getMetaDataStroage().argumentsDescriptors.get(ad.target)) !== null && _a !== void 0 ? _a : [];
        this.getMetaDataStroage().argumentsDescriptors.set(ad.target, __spread(prev, [ad]));
    };
    MetaDataStorage.addEntityDescriptor = function (ed) {
        this.getMetaDataStroage().entityDescriptors.push(ed);
    };
    MetaDataStorage.addMiddleware = function (m) {
        this.getMetaDataStroage().serviceDescriptors.enqueue(m);
    };
    MetaDataStorage.prototype.initializeController = function () {
        var e_1, _a, e_2, _b;
        var _c, _d, _e;
        try {
            for (var _f = __values(this.controllerDescriptors), _g = _f.next(); !_g.done; _g = _f.next()) {
                var cd = _g.value;
                var instance = this.instantiationController(cd.proto, cd.args);
                var routers = (_c = this.actionDescriptors.get(cd.target)) !== null && _c !== void 0 ? _c : [];
                var _loop_1 = function (router) {
                    var args = (_e = (_d = this_1.argumentsDescriptors.get(cd.target)) === null || _d === void 0 ? void 0 : _d.filter(function (arg) { return arg.key === router.key; })) !== null && _e !== void 0 ? _e : [];
                    router_1.RouterUtils.add({ actionDescriptor: router, prefix: cd.prefix, args: args, host: instance });
                };
                var this_1 = this;
                try {
                    for (var routers_1 = (e_2 = void 0, __values(routers)), routers_1_1 = routers_1.next(); !routers_1_1.done; routers_1_1 = routers_1.next()) {
                        var router = routers_1_1.value;
                        _loop_1(router);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (routers_1_1 && !routers_1_1.done && (_b = routers_1.return)) _b.call(routers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                // RouterStorage.printRouter();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    MetaDataStorage.prototype.injectConfig = function () {
        var _a;
        var proto = Reflect.getPrototypeOf(MetaDataStorage.envConfig);
        proto.id = (_a = proto.id) !== null && _a !== void 0 ? _a : Uuid.v4();
        this.serviceInstantiationMap.set(proto.id, MetaDataStorage.envConfig);
        return MetaDataStorage.envConfig;
    };
    MetaDataStorage.prototype.instantiationServices = function () {
        var e_3, _a;
        var _this = this;
        var _loop_2 = function (s) {
            // undo 参数不存在的情况
            var args = [];
            s.args.forEach(function (arg) {
                if (_this.serviceInstantiationMap.has(arg) !== undefined) {
                    args.push(_this.serviceInstantiationMap.get(arg));
                }
            });
            var instance = Reflect.construct(s.proto, args);
            if (s.type === types_1.InjectorType.Middleware) {
                // MiddlewareStorage.add(instance, s.middlewareTypes!);
            }
            else {
                this_2.serviceInstantiationMap.set(s.target, instance);
            }
        };
        var this_2 = this;
        try {
            for (var _b = __values(this.serviceDescriptors), _c = _b.next(); !_c.done; _c = _b.next()) {
                var s = _c.value;
                _loop_2(s);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    MetaDataStorage.prototype.instantiationController = function (cc, args) {
        var _this = this;
        return Reflect.construct(cc, args.map(function (arg) { return _this.serviceInstantiationMap.get(arg); }));
    };
    // private async initDatabase() {
    //   if (this.entityDescriptors.length !== 0) {
    //     /// 初始化数据库， 先拿配置文件
    //     const db = DinarDatabase.getMongoDBInstance();
    //     if (MetaDataStorage.envConfig.use_mongo) {
    //       try {
    //         for (const ed of this.entityDescriptors) {
    //           const model = db.collection<any>(ed.name);
    //           this.serviceInstantiationMap.set(ed.target, model);
    //         }
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     } else {
    //       throw "do not enable mongo db from .env file";
    //     }
    //   }
    // }
    MetaDataStorage.resolve = function () {
        return __awaiter(this, void 0, void 0, function () {
            var instacne;
            return __generator(this, function (_a) {
                instacne = MetaDataStorage.getMetaDataStroage();
                instacne.injectConfig();
                // console.log(instacne.controllerDescriptor);
                // console.log(instacne.routerMethodDescriptor);
                // console.log(instacne.serviceDescriptor);
                // 首先连接数据库
                // instacne.initDatabase();
                // init entities undo
                instacne.instantiationServices();
                // console.log(instacne.serviceInstantiationMap);
                // init controllers doing
                instacne.initializeController();
                return [2 /*return*/];
            });
        });
    };
    MetaDataStorage.envConfig = new EnvConfig_1.EnvConfig(dotenv_1.config());
    return MetaDataStorage;
}());
exports.MetaDataStorage = MetaDataStorage;
