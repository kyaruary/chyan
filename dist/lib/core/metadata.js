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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaDataStorage = void 0;
const types_1 = require("../@types/types");
const PriorityList_1 = require("../utils/PriorityList");
const dotenv_1 = require("dotenv");
const EnvConfig_1 = require("./EnvConfig");
const Uuid = __importStar(require("uuid"));
const router_1 = require("./router");
const path_1 = require("path");
const middleware_storage_1 = require("./middleware-storage");
const database_1 = require("./database");
const mongoose_1 = require("mongoose");
class MetaDataStorage {
    constructor() {
        // descriptor metadata storage
        // routesMap: RouterMap = new Map();
        this.serviceDescriptors = new PriorityList_1.PriorityList();
        this.controllerDescriptors = [];
        this.actionDescriptors = new Map();
        this.argumentsDescriptors = new Map();
        this.entityDescriptors = [];
        this.middlewareMap = new Map();
        // instantiation storage
        this.serviceInstantiationMap = new Map();
    }
    static getMetaDataStroage() {
        if (!MetaDataStorage.instacne) {
            MetaDataStorage.instacne = new MetaDataStorage();
        }
        return MetaDataStorage.instacne;
    }
    static addServiceDescriptor(sd) {
        MetaDataStorage.getMetaDataStroage().serviceDescriptors.enqueue(sd);
    }
    static addControllerDescriptor(cd) {
        MetaDataStorage.getMetaDataStroage().controllerDescriptors.push(cd);
    }
    static addActionDescriptor(rmd) {
        const prev = MetaDataStorage.getMetaDataStroage().actionDescriptors.get(rmd.target) || [];
        MetaDataStorage.getMetaDataStroage().actionDescriptors.set(rmd.target, [...prev, rmd]);
    }
    static addArgumentsDescriptor(ad) {
        const prev = this.getMetaDataStroage().argumentsDescriptors.get(ad.target) || [];
        this.getMetaDataStroage().argumentsDescriptors.set(ad.target, [...prev, ad]);
    }
    static attachMiddleware2Action(target, key, middleware) {
        const k = target + key;
        const prev = this.getMetaDataStroage().middlewareMap.get(k) || [];
        this.getMetaDataStroage().middlewareMap.set(target + key, [...prev, middleware]);
    }
    static addEntityDescriptor(ed) {
        this.getMetaDataStroage().entityDescriptors.push(ed);
    }
    static addMiddleware(m) {
        this.getMetaDataStroage().serviceDescriptors.enqueue(m);
    }
    initializeController() {
        var _a;
        for (const cd of this.controllerDescriptors) {
            const instance = this.instantiationController(cd.proto, cd.args);
            const routers = this.actionDescriptors.get(cd.target) || [];
            for (const router of routers) {
                const args = ((_a = this.argumentsDescriptors.get(cd.target)) === null || _a === void 0 ? void 0 : _a.filter((arg) => arg.key === router.key)) || [];
                const middlewares = this.middlewareMap.get(cd.target + router.key) || [];
                router_1.RouterUtils.add({ actionDescriptor: router, prefix: cd.prefix, args, host: instance, middlewares: middlewares });
            }
        }
    }
    injectEnvConfig() {
        const proto = Reflect.getPrototypeOf(MetaDataStorage.envConfig);
        proto.id = proto.id || Uuid.v4();
        this.serviceInstantiationMap.set(proto.id, MetaDataStorage.envConfig);
        return MetaDataStorage.envConfig;
    }
    instantiationServices() {
        for (const s of this.serviceDescriptors) {
            // undo 参数不存在的情况
            const args = [];
            s.args.forEach((arg) => {
                if (this.serviceInstantiationMap.has(arg) !== undefined) {
                    args.push(this.serviceInstantiationMap.get(arg));
                }
            });
            const instance = Reflect.construct(s.proto, args);
            if (s.type === types_1.InjectorType.Middleware) {
                middleware_storage_1.MiddlewareStorage.add(instance, s.middlewareTypes);
            }
            else {
                this.serviceInstantiationMap.set(s.target, instance);
            }
        }
    }
    instantiationController(cc, args) {
        return Reflect.construct(cc, args.map((arg) => this.serviceInstantiationMap.get(arg)));
    }
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.entityDescriptors.length !== 0) {
                /// 初始化数据库， 先拿配置文件
                const uri = MetaDataStorage.envConfig.mongo_uri + "/" + MetaDataStorage.envConfig.mongo_database;
                yield database_1.DatabaseFacade.connectMongodb(uri);
                try {
                    for (const ed of this.entityDescriptors) {
                        const schema = ed.schema ? new mongoose_1.Schema(ed.schema) : new mongoose_1.Schema({});
                        const m = mongoose_1.model(ed.name, schema);
                        this.serviceInstantiationMap.set(ed.target, m);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
    static resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const instacne = MetaDataStorage.getMetaDataStroage();
            // 首先连接数据库
            yield instacne.initDatabase();
            // init entities undo
            instacne.instantiationServices();
            // console.log(instacne.serviceInstantiationMap);
            // init controllers doing
            instacne.initializeController();
        });
    }
}
exports.MetaDataStorage = MetaDataStorage;
MetaDataStorage.envConfig = new EnvConfig_1.EnvConfig(dotenv_1.config({ path: path_1.resolve(process.cwd(), ".env") }).parsed);
