"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.EnvConfig = void 0;
var EnvConfig = /** @class */ (function (_super) {
    __extends(EnvConfig, _super);
    function EnvConfig(config) {
        var e_1, _a;
        var _this = _super.call(this) || this;
        _this.port = 8080;
        _this.app_name = "";
        _this.use_mongo = false;
        _this.mongo_database = "";
        _this.mongo_uri = "";
        _this.controllers = "";
        _this.static_file_path = "";
        _this.extra = {};
        _this.hostname = "127.0.0.1";
        var keys = Object.keys(config);
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                var localKey = key.toLowerCase();
                if (_this.hasOwnProperty(localKey) && localKey !== "extra") {
                    Reflect.set(_this, localKey, config[key]);
                }
                else {
                    Reflect.set(_this.extra, localKey, config[key]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return _this;
    }
    return EnvConfig;
}(Object));
exports.EnvConfig = EnvConfig;
