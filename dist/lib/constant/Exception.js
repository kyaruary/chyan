"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedMediaTypeException = exports.InternalServerErrorException = exports.UnauthorizedException = exports.RequestTimeoutException = exports.NotImplementedException = exports.NotAcceptableException = exports.MethodNotAllowedException = exports.GoneException = exports.GatewayTimeoutException = exports.ForbiddenException = exports.ConflictException = exports.BadRequestException = exports.BadGatewayException = exports.ParamsNotInvalideException = exports.NotFoundException = exports.HttpException = exports.Status = void 0;
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
function BadGatewayException() { }
exports.BadGatewayException = BadGatewayException;
function BadRequestException() { }
exports.BadRequestException = BadRequestException;
function ConflictException() { }
exports.ConflictException = ConflictException;
function ForbiddenException() { }
exports.ForbiddenException = ForbiddenException;
function GatewayTimeoutException() { }
exports.GatewayTimeoutException = GatewayTimeoutException;
function GoneException() { }
exports.GoneException = GoneException;
function MethodNotAllowedException() { }
exports.MethodNotAllowedException = MethodNotAllowedException;
function NotAcceptableException() { }
exports.NotAcceptableException = NotAcceptableException;
function NotImplementedException() { }
exports.NotImplementedException = NotImplementedException;
function RequestTimeoutException() { }
exports.RequestTimeoutException = RequestTimeoutException;
function UnauthorizedException() { }
exports.UnauthorizedException = UnauthorizedException;
function InternalServerErrorException() { }
exports.InternalServerErrorException = InternalServerErrorException;
function UnsupportedMediaTypeException() { }
exports.UnsupportedMediaTypeException = UnsupportedMediaTypeException;
