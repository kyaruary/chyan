"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const lib_1 = require("../lib");
const InjectEnvConfig_1 = require("../lib/decorators/custom/InjectEnvConfig");
let Application = class Application extends lib_1.BootstrapApplication {
    constructor(config) {
        super();
        this.config = config;
    }
    main() {
        this.app.useRouter(this.router);
        console.log(this.config.app_name);
        this.app.run();
    }
};
Application = __decorate([
    lib_1.ChyanApplication(),
    __metadata("design:paramtypes", [InjectEnvConfig_1.EnvConfig])
], Application);
exports.Application = Application;
