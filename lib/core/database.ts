import { connect } from "mongoose";

export class DatabaseFacade {
  static async connectMongodb(uri: string) {
    await connect(uri, { useNewUrlParser: true });
  }
}
