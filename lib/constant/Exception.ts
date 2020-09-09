export enum Status {
  NOT_FOUND = 404,
  NO_AUTHORIZATION = 401,
}

export class HttpException extends Error {
  constructor(public status: number, public msg: string) {
    super();
  }
}

export function NotFoundException() {
  return new HttpException(Status.NOT_FOUND, "Not Found");
}

export function ParamsNotInvalideException() {
  return new HttpException(Status.NO_AUTHORIZATION, "Params Invalide");
}

export function BadGatewayException() {}

export function BadRequestException() {}

export function ConflictException() {}

export function ForbiddenException() {}

export function GatewayTimeoutException() {}

export function GoneException() {}

export function MethodNotAllowedException() {}

export function NotAcceptableException() {}

export function NotImplementedException() {}

export function RequestTimeoutException() {}

export function UnauthorizedException() {}

export function InternalServerErrorException() {}

export function UnsupportedMediaTypeException() {}
