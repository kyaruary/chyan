import { Habe, Controller, Get, Service, Post, Body } from "../lib";

@Controller()
export class Hello {
  @Get()
  get() {
    return "123";
  }
  @Post()
  post(@Body("phone") body: any) {
    console.log(body);
    return "ok";
  }
}
const app = Habe.createApplication();

app.run();
