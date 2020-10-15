export enum HttpStatusCode {
  BadRequest = 400,
  Unauthorization = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  UnsupportedMediaType = 415,
  InternalServerError = 500,
  BadGateway = 502,
  GatewayTimeout = 504,
}

export class HttpException extends Error {
  constructor(public status: number, public msg: string) {
    super();
  }
}

export function NotFoundException() {
  return new HttpException(HttpStatusCode.NotFound, "Not Found");
}

export function BadGatewayException() {
  return new HttpException(HttpStatusCode.BadGateway, "Bad Gateway");
}

export function BadRequestException() {
  return new HttpException(HttpStatusCode.BadRequest, "Bad Request");
}

export function ConflictException() {
  return new HttpException(HttpStatusCode.Conflict, "Conflict");
}

export function ForbiddenException() {
  return new HttpException(HttpStatusCode.Forbidden, "Forbidden");
}

export function GatewayTimeoutException() {
  return new HttpException(HttpStatusCode.GatewayTimeout, "Gateway Time-out");
}

export function GoneException() {
  return new HttpException(HttpStatusCode.Gone, "Gone");
}

export function MethodNotAllowedException() {
  return new HttpException(HttpStatusCode.MethodNotAllowed, "Method Not Allowed");
}

export function NotAcceptableException() {
  return new HttpException(HttpStatusCode.NotAcceptable, "Not Acceptable");
}

export function RequestTimeoutException() {
  return new HttpException(HttpStatusCode.RequestTimeout, "Request Time-out");
}

export function UnauthorizedException() {
  return new HttpException(HttpStatusCode.Unauthorization, "Unauthorization");
}

export function InternalServerErrorException() {
  return new HttpException(HttpStatusCode.InternalServerError, "Internal Server Error");
}

export function UnsupportedMediaTypeException() {
  return new HttpException(HttpStatusCode.UnsupportedMediaType, "Unsupported Media Type");
}
