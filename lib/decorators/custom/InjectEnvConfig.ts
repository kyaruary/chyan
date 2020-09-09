import { config } from "dotenv";
import { Injectable } from "../internal/Injectable";
import { resolve } from "path";
export function InjectEnvConfig() {
  return Injectable();
}

@InjectEnvConfig()
export class EnvConfig {
  port = 8080;
  app_name = "Chyan.Application";
  constructor() {
    config({ path: resolve(process.cwd(), ".env") });
    const envConfig = process.env;
    const keys = Object.keys(envConfig);
    for (const key of keys) {
      const localKey = key.toLowerCase();
      if (this.hasOwnProperty(localKey)) {
        Reflect.set(this, localKey, envConfig[key]);
      }
    }
  }
}
