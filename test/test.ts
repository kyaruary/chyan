import { BootstrapApplication, ChyanApplication, Ctx, Get, Context, Query } from "../lib";

@ChyanApplication()
export class App extends BootstrapApplication {
  main() {
    this.app.useRouter(this.router);
    this.app.run(8083);
  }

  @Get()
  homepage(@Ctx() ctx: Context, @Query("name") name: string) {
    return ctx.url;
  }
}
