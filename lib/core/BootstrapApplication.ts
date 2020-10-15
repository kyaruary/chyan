import { RouterStorage } from "./router";
import { connect } from "mongoose";
import { Application } from "./Application";

export abstract class BootstrapApplication {
  readonly app = new Application();
  readonly router = RouterStorage.getRouter();
  scanner: string[] | string = [];
  useMongo = false;
  MongoUri = "";

  constructor() {}

  abstract main(): Promise<void> | void;

  readonly start = async () => {
    if (this.useMongo) {
      await connect(this.MongoUri);
    }
    await this.main();
  };
}
