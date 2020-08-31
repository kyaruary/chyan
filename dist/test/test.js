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
exports.MyInterceptor = exports.MyLogger = exports.HttpExceptionFilter = exports.Hello = void 0;
const lib_1 = require("../lib");
const fs_1 = require("fs");
const path_1 = require("path");
const multerOption = {};
let Hello = class Hello {
    get(next) {
        return __awaiter(this, void 0, void 0, function* () {
            return "interceptor";
        });
    }
    post(avatar, ctx) { }
};
__decorate([
    lib_1.Get(),
    __param(0, lib_1.NextFc()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], Hello.prototype, "get", null);
__decorate([
    lib_1.Post(),
    __param(0, lib_1.Upload("avatar", multerOption)), __param(1, lib_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
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
class MyLogger {
    constructor() {
        this.queue = [];
    }
    log(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.isStatic) {
                return;
            }
            const time = new Date();
            const ftime = `*** [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}/${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:${time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()}]`;
            const msg = `${ftime}, ${ctx.method}, 访问地址: ${ctx.url}, ip: ${ctx.ip}, 请求参数: ${JSON.stringify(ctx.request.body)}, 返回数据: ${JSON.stringify(ctx.response.body)}\n`;
            console.log(msg);
            this.queue.push(msg);
            // setInterval(() => {
            //   this.write2File();
            // }, 1000 * 6);
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
exports.MyLogger = MyLogger;
class MyInterceptor {
    apply(c, data) {
        c.body = {
            data,
            code: 0,
            msg: "success",
        };
    }
}
exports.MyInterceptor = MyInterceptor;
const app = lib_1.Habe.createApplication({
    controllers: [],
});
app.useGlobalExceptionFilter(HttpExceptionFilter);
app.useLogger(MyLogger);
app.useGlobalInterceptor(MyInterceptor);
app.useStatic("./public");
app.run();
