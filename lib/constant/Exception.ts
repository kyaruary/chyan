export enum Exception {
  NOT_FOUNT_EXCEPTION,
  NO_AUTHORIZATION_EXCEPTION,
}

export class HttpException {
  status?: number;
  msg: string = "";
  constructor(status?: number, msg?: string) {
    this.status = status ?? this.status;
    this.msg = msg ?? this.msg;
  }
}

export class RouterNotFountException extends HttpException {}

export class NotFountException implements HttpException {
  status = 404;
  msg = "Not Found";
}

export class ParamsNotInvalide extends HttpException {
  status = 401;
  msg = "Params Invalide";
}

export class NotImplementException {}
