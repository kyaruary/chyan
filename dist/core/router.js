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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterUtils = void 0;
var ArgumentsTypes_1 = require("../constant/ArgumentsTypes");
var koa_router_1 = __importDefault(require("koa-router"));
var router = new koa_router_1.default();
var RouterUtils = /** @class */ (function () {
    function RouterUtils() {
    }
    RouterUtils.add = function (r) {
        return __awaiter(this, void 0, void 0, function () {
            var fullPath, time, method;
            var _this = this;
            return __generator(this, function (_a) {
                fullPath = this.generateRouterPath(r.prefix, r.actionDescriptor.suffix);
                time = new Date();
                console.log("*** [" + time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate() + "/" + time.getHours() + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()) + ":" + time.getSeconds() + "] \u6CE8\u5165\u8DEF\u7531 " + fullPath + " ,host: " + r.actionDescriptor.hostName + "@" + r.actionDescriptor.key);
                method = r.actionDescriptor.type.toLowerCase();
                router[method](fullPath, function (c, next) { return __awaiter(_this, void 0, void 0, function () {
                    var args, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                args = this.injectArugments(c, r, next).args;
                                return [4 /*yield*/, Reflect.apply(r.actionDescriptor.callback, r.host, __spread(args))];
                            case 1:
                                result = _a.sent();
                                if (result !== undefined) {
                                    c.body = result;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    RouterUtils.formatRouter = function (url) {
        return url === "/" ? url : url.replace(/\/$/, "");
    };
    RouterUtils.generateRouterPath = function (prefix, sub_path) {
        return this.formatRouter(("/" + prefix + "/" + sub_path).replace(/[/]{2,}/g, "/"));
    };
    RouterUtils.injectArugments = function (c, r, next) {
        var e_1, _a;
        var args = [];
        var body = c.body, session = c.session, cookie = c.cookie, query = c.query, params = c.params;
        var argumentsMetadataArr = [];
        try {
            for (var _b = __values(r.args), _c = _b.next(); !_c.done; _c = _b.next()) {
                var arg = _c.value;
                var object = void 0;
                switch (arg.type) {
                    case ArgumentsTypes_1.ArgumentsTypes.BODY:
                        object = arg.field ? body[arg.field] : body;
                        break;
                    case ArgumentsTypes_1.ArgumentsTypes.COOKIE:
                        object = cookie;
                        break;
                    case ArgumentsTypes_1.ArgumentsTypes.PARAMS:
                        object = arg.field ? params[arg.field] : params;
                        break;
                    case ArgumentsTypes_1.ArgumentsTypes.QUERY:
                        object = arg.field ? query[arg.field] : query;
                        break;
                    case ArgumentsTypes_1.ArgumentsTypes.REQ:
                        object = c.req;
                        break;
                    case ArgumentsTypes_1.ArgumentsTypes.SESSION:
                        object = session;
                        break;
                    case ArgumentsTypes_1.ArgumentsTypes.CONTEXT:
                        object = c;
                        break;
                    case ArgumentsTypes_1.ArgumentsTypes.NEXT:
                        object = next;
                        break;
                    case ArgumentsTypes_1.ArgumentsTypes.FILE:
                        object = next; // todo
                        break;
                    case ArgumentsTypes_1.ArgumentsTypes.FILES:
                        object = next; // todo
                        break;
                    default:
                        console.error("arguments can not find type,", arg.type);
                        break;
                }
                args[arg.position] = object;
                argumentsMetadataArr.push({ value: object, argType: r.actionDescriptor.argsType[arg.position], metaType: arg.type, field: arg.field });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { args: args, argumentsMetadataArr: argumentsMetadataArr };
    };
    RouterUtils.getRouter = function () {
        return router;
    };
    return RouterUtils;
}());
exports.RouterUtils = RouterUtils;
