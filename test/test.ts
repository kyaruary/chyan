import { ChyanApplication, Controller, Get } from "../lib";
import { BootstrapApplication } from "../lib/core/BootstrapApplication";

@ChyanApplication()
export class Application extends BootstrapApplication {
  main() {
    this.app.run();
  }
}

@Controller()
export class NekoController {
  @Get()
  getNeko() {
    return "happy";
  }
}
