import { Record } from "../@types/types";
export declare class EnvConfig<T extends Record = Record> extends Object {
    port: number | string;
    app_name: string;
    use_mongo: boolean;
    mongo_database: string;
    mongo_uri: string;
    controllers: string;
    static_file_path: string;
    extra: T;
    hostname: string;
    constructor(config: Record);
}
