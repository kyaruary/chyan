import { Injectable } from "@chyan/ioc";
import { config } from "dotenv";
import { resolve } from "path";

@Injectable()
export class EnvConfig {
  port = 8080;
  app_name = "Chyan.Application";
  env_file = ".env";

  constructor() {
    config({ path: resolve(process.cwd(), this.env_file) });
    const envConfig = process.env;
    const keys = Object.keys(envConfig);
    for (const key of keys) {
      const localKey = key.toLowerCase();
      Reflect.set(this, localKey, envConfig[key]);
    }
  }
}
