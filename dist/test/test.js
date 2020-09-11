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
exports.Application = exports.UserModel = void 0;
const lib_1 = require("../lib");
const koa_static_1 = __importDefault(require("koa-static"));
const path_1 = require("path");
let UserModel = class UserModel extends lib_1.Model {
};
UserModel = __decorate([
    lib_1.MongoCollection("user")
], UserModel);
exports.UserModel = UserModel;
let Application = class Application extends lib_1.BootstrapApplication {
    constructor(um) {
        super();
        this.um = um;
    }
    main() {
        this.app.useRouter(this.router);
        this.app.useGlobalMiddleware(koa_static_1.default(path_1.resolve(process.cwd(), "public")));
        this.app.run(1234);
    }
    helloWorld() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.um.find();
        });
    }
};
__decorate([
    lib_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Application.prototype, "helloWorld", null);
Application = __decorate([
    lib_1.ChyanApplication(),
    __metadata("design:paramtypes", [UserModel])
], Application);
exports.Application = Application;
