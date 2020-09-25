import { BootstrapApplication, ChyanApplication, Ctx, Get, Context, Query, EnvConfig } from "../lib";

@ChyanApplication()
export class App extends BootstrapApplication {
  constructor(private config: EnvConfig) {
    super();
  }
  main() {
    console.log(this.config.port);
    this.app.useRouter(this.router);
    this.app.run(8083);
  }

  @Get()
  homepage(@Ctx() ctx: Context, @Query("name") name: string) {
    return ctx.url;
  }
}
