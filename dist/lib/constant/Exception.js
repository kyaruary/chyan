"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementException = exports.ParamsNotInvalide = exports.NotFountException = exports.RouterNotFountException = exports.HttpException = exports.Exception = void 0;
var Exception;
(function (Exception) {
    Exception[Exception["NOT_FOUNT_EXCEPTION"] = 0] = "NOT_FOUNT_EXCEPTION";
    Exception[Exception["NO_AUTHORIZATION_EXCEPTION"] = 1] = "NO_AUTHORIZATION_EXCEPTION";
})(Exception = exports.Exception || (exports.Exception = {}));
class HttpException {
    constructor(status, msg) {
        this.msg = "";
        this.status = status ?? this.status;
        this.msg = msg ?? this.msg;
    }
}
exports.HttpException = HttpException;
class RouterNotFountException extends HttpException {
}
exports.RouterNotFountException = RouterNotFountException;
class NotFountException {
    constructor() {
        this.status = 404;
        this.msg = "Not Found";
    }
}
exports.NotFountException = NotFountException;
class ParamsNotInvalide extends HttpException {
    constructor() {
        super(...arguments);
        this.status = 401;
        this.msg = "Params Invalide";
    }
}
exports.ParamsNotInvalide = ParamsNotInvalide;
class NotImplementException {
}
exports.NotImplementException = NotImplementException;
