import { BootstrapApplication, ChyanApplication, Get } from "../lib";

@ChyanApplication()
export class Application extends BootstrapApplication {
  main() {
    this.app.useRouter(this.router);
    this.app.run();
  }
  @Get()
  home() {
    return "chyan";
  }
}
