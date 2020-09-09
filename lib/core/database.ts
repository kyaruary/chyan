import { connect } from "mongoose";

export class DatabaseFacade {
  static async connectMongodb(uri: string) {
    return await connect(uri, { useNewUrlParser: true });
  }
}
