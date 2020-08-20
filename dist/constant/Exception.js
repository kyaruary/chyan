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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementException = exports.ParamsNotInvalide = exports.NotFountException = exports.RouterNotFountException = exports.HttpException = exports.Exception = void 0;
var Exception;
(function (Exception) {
    Exception[Exception["NOT_FOUNT_EXCEPTION"] = 0] = "NOT_FOUNT_EXCEPTION";
    Exception[Exception["NO_AUTHORIZATION_EXCEPTION"] = 1] = "NO_AUTHORIZATION_EXCEPTION";
})(Exception = exports.Exception || (exports.Exception = {}));
var HttpException = /** @class */ (function () {
    function HttpException(status, msg) {
        this.msg = "";
        this.status = status !== null && status !== void 0 ? status : this.status;
        this.msg = msg !== null && msg !== void 0 ? msg : this.msg;
    }
    return HttpException;
}());
exports.HttpException = HttpException;
var RouterNotFountException = /** @class */ (function (_super) {
    __extends(RouterNotFountException, _super);
    function RouterNotFountException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RouterNotFountException;
}(HttpException));
exports.RouterNotFountException = RouterNotFountException;
var NotFountException = /** @class */ (function () {
    function NotFountException() {
        this.status = 404;
        this.msg = "Not Found";
    }
    return NotFountException;
}());
exports.NotFountException = NotFountException;
var ParamsNotInvalide = /** @class */ (function (_super) {
    __extends(ParamsNotInvalide, _super);
    function ParamsNotInvalide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = 401;
        _this.msg = "Params Invalide";
        return _this;
    }
    return ParamsNotInvalide;
}(HttpException));
exports.ParamsNotInvalide = ParamsNotInvalide;
var NotImplementException = /** @class */ (function () {
    function NotImplementException() {
    }
    return NotImplementException;
}());
exports.NotImplementException = NotImplementException;
