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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.Logger = exports.HttpExceptionFilter = exports.Hello = void 0;
const lib_1 = require("../lib");
const fs_1 = require("fs");
const path_1 = require("path");
let Hello = class Hello {
    get() {
        throw "error home page";
        return "123";
    }
    post(body) {
        console.log(body);
        return "ok";
    }
};
__decorate([
    lib_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Hello.prototype, "get", null);
__decorate([
    lib_1.Post(),
    __param(0, lib_1.Body("phone")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Hello.prototype, "post", null);
Hello = __decorate([
    lib_1.Controller()
], Hello);
exports.Hello = Hello;
class HttpExceptionFilter {
    catch(error, ctx) {
        ctx.body = {
            code: -1,
            msg: error,
        };
    }
}
exports.HttpExceptionFilter = HttpExceptionFilter;
class Logger {
    constructor() {
        this.queue = [];
    }
    log(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const time = new Date();
            const ftime = `*** [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}/${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:${time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()}]`;
            const msg = `${ftime}, ${ctx.method}, ${ctx.url}, ${ctx.ip}, ${JSON.stringify(ctx.request.body)}, ${JSON.stringify(ctx.response.body)}`;
            console.log(msg);
            this.queue.push(msg);
            setInterval(() => {
                this.write2File();
            }, 1000 * 6);
        });
    }
    write2File() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.queue.length === 0) {
                return;
            }
            const logs = this.queue.join("\n");
            this.queue = [];
            yield fs_1.promises.writeFile(path_1.resolve(__dirname, "../log/record.log"), logs, { flag: "a+" });
            console.log("write log success");
        });
    }
}
exports.Logger = Logger;
const app = lib_1.Habe.createApplication();
app.useGlobalExceptionFilter(HttpExceptionFilter);
app.useLogger(Logger);
app.run();
