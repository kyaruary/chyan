import { Habe, Controller, Get, Service } from "../lib";

@Controller()
export class Hello {
  @Get()
  get() {
    return "123";
  }
}
const app = Habe.createApplication();

app.run();
