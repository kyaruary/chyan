import { Habe, Controller, Post, Filter } from "../lib";
import { MongoCollection } from "../lib/decorators/MongoCollection";
import { Collection } from "mongoose";

const app = Habe.createApplication();

@MongoCollection("user")
export class UserModel extends Collection {}

@Controller()
export class C {
  constructor(private um: UserModel) {}
  @Post()
  async file() {
    return this.um.find();
  }
}

// app.useGlobalExceptionFilter(HttpExceptionFilter);

app.run();
