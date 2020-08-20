export declare enum Exception {
    NOT_FOUNT_EXCEPTION = 0,
    NO_AUTHORIZATION_EXCEPTION = 1
}
export declare class HttpException {
    status?: number;
    msg: string;
    constructor(status?: number, msg?: string);
}
export declare class RouterNotFountException extends HttpException {
}
export declare class NotFountException implements HttpException {
    status: number;
    msg: string;
}
export declare class ParamsNotInvalide extends HttpException {
    status: number;
    msg: string;
}
export declare class NotImplementException {
}
