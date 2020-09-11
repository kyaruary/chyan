import { Controller, Get } from "../../lib";
@Controller()
export class C {
  @Get()
  hello() {
    return "hello chyan";
  }
}
