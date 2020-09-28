import { Chyan } from "./Chyan";
import { RouterStorage } from "./router";
import { connect } from "mongoose";
export abstract class BootstrapApplication {
  readonly app = Chyan.createApplication();
  scanner: string[] | string = [];
  router = RouterStorage.getRouter();
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
