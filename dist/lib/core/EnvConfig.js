"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfig = void 0;
class EnvConfig extends Object {
    constructor(config) {
        super();
        this.port = 8080;
        this.app_name = "";
        this.use_mongo = false;
        this.mongo_database = "";
        this.mongo_uri = "";
        this.controllers = "";
        this.static_file_path = "";
        this.extra = {};
        this.hostname = "127.0.0.1";
        const keys = Object.keys(config);
        for (const key of keys) {
            const localKey = key.toLowerCase();
            if (this.hasOwnProperty(localKey) && localKey !== "extra") {
                Reflect.set(this, localKey, config[key]);
            }
            else {
                Reflect.set(this.extra, localKey, config[key]);
            }
        }
    }
}
exports.EnvConfig = EnvConfig;
