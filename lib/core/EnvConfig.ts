import { Record } from "../@types/types";
export class EnvConfig<T extends Record = Record> extends Object {
  port: number | string = 8080;
  app_name: string = "";
  use_mongo: boolean = false;
  mongo_database: string = "";
  mongo_uri: string = "";
  controllers: string = "";
  static_file_path: string = "";
  extra: T = {} as T;
  hostname: string = "127.0.0.1";

  constructor(config: Record) {
    super();
    const keys = Object.keys(config);
    for (const key of keys) {
      const localKey = key.toLowerCase();
      if (this.hasOwnProperty(localKey) && localKey !== "extra") {
        Reflect.set(this, localKey, config[key]);
      } else {
        Reflect.set(this.extra, localKey, config[key]);
      }
    }
  }
}
