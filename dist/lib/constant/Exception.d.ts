export declare enum Status {
    NOT_FOUND = 404,
    NO_AUTHORIZATION = 401
}
export declare class HttpException extends Error {
    status: number;
    msg: string;
    constructor(status: number, msg: string);
}
export declare function NotFoundException(): HttpException;
export declare function ParamsNotInvalideException(): HttpException;
