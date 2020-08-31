import { Collection } from "mongoose";
export declare class UserModel extends Collection {
}
export declare class C {
    private um;
    constructor(um: UserModel);
    file(): Promise<import("mongodb").Cursor<any>>;
}
