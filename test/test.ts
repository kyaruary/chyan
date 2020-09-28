import { SchemaType } from "mongoose";
import { AutoIncrement, BootstrapApplication, ChyanApplication, MongoCollection, Model, Document, Get, Schema } from "../lib";

interface User {
  name: string;
  id: number;
}

const userSchema = new Schema({
  id: { type: Schema.Types.Number },
  name: { type: Schema.Types.String },
});

@MongoCollection("user", userSchema)
@AutoIncrement("id")
export class UserModel extends Model<User & Document> {}

@ChyanApplication()
export class App extends BootstrapApplication {
  useMongo = true;
  MongoUri = "mongodb://localhost:27017/test";
  constructor(private um: UserModel) {
    super();
  }
  async main() {
    this.app.useRouter(this.router);
    this.app.run(8081);
  }

  @Get()
  async get() {
    const users = await this.um.find();
    return users;
  }
}
