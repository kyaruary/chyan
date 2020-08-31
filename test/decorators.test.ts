import { Habe, Controller, Get, Post } from "../lib";

const app = Habe.createApplication();

@Controller()
export class C {
  @Get()
  @Post()
  getOrPost() {
    return "";
  }
}
app.run();
