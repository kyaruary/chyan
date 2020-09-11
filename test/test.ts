import { BootstrapApplication, ChyanApplication, Get, Model, MongoCollection } from "../lib";
import serve from "koa-static";
import { resolve } from "path";
import { Document } from "mongoose";

interface User {
  name: string;
}

@MongoCollection("user")
export class UserModel extends Model {}

@ChyanApplication()
export class Application extends BootstrapApplication {
  constructor(private um: UserModel) {
    super();
  }
  main() {
    this.app.useRouter(this.router);
    this.app.useGlobalMiddleware(serve(resolve(process.cwd(), "public")));
    this.app.run(1234);
  }
  @Get()
  async helloWorld() {
    return this.um.find();
  }
}
