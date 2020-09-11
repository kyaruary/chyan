import { BootstrapApplication, Model } from "../lib";
import { Document } from "mongoose";
export declare class UserModel extends Model {
}
export declare class Application extends BootstrapApplication {
    private um;
    constructor(um: UserModel);
    main(): void;
    helloWorld(): Promise<Document[]>;
}
