import Router from "koa-router";
import { Chyan } from "./Chyan";
import { RouterStorage } from "./router";

export abstract class BootstrapApplication {
  readonly app = Chyan.createApplication();
  scanner: string[] | string = [];
  router = RouterStorage.getRouter();

  abstract main(): Promise<void> | void;

  readonly start = async () => {
    await this.main();
  };
}
