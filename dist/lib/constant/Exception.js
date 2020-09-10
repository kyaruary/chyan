"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsNotInvalideException = exports.NotFoundException = exports.HttpException = exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["NOT_FOUND"] = 404] = "NOT_FOUND";
    Status[Status["NO_AUTHORIZATION"] = 401] = "NO_AUTHORIZATION";
})(Status = exports.Status || (exports.Status = {}));
class HttpException extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.msg = msg;
    }
}
exports.HttpException = HttpException;
function NotFoundException() {
    return new HttpException(Status.NOT_FOUND, "Not Found");
}
exports.NotFoundException = NotFoundException;
function ParamsNotInvalideException() {
    return new HttpException(Status.NO_AUTHORIZATION, "Params Invalide");
}
exports.ParamsNotInvalideException = ParamsNotInvalideException;
