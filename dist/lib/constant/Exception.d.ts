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
export declare function BadGatewayException(): void;
export declare function BadRequestException(): void;
export declare function ConflictException(): void;
export declare function ForbiddenException(): void;
export declare function GatewayTimeoutException(): void;
export declare function GoneException(): void;
export declare function MethodNotAllowedException(): void;
export declare function NotAcceptableException(): void;
export declare function NotImplementedException(): void;
export declare function RequestTimeoutException(): void;
export declare function UnauthorizedException(): void;
export declare function InternalServerErrorException(): void;
export declare function UnsupportedMediaTypeException(): void;
