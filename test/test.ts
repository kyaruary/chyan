import { Habe, Controller, Get, Service } from "../lib";
import { Ctx, NextFc, Params, Session } from "../lib/decorators/Arguments";
import { Context, Next } from "koa";

@Service()
export class CatService {
  get() {
    return ["habe"];
  }
}

@Controller()
export class HomeController {
  constructor(private cs: CatService) {}

  @Get(":name")
  hi(@Params("name") name: string) {
    return "hi";
  }

  @Get()
  getall(@Session() session: any) {
    console.log(session.habe);
    session.habe = true;
    return this.cs.get();
  }
}

const app = Habe.createApplication();

app.run();
