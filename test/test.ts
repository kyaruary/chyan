import { BootstrapApplication, ChyanApplication, Controller, Get, Service } from "../lib";
import { EnvConfig } from "../lib/decorators/custom/InjectEnvConfig";

@ChyanApplication()
export class Application extends BootstrapApplication {
  constructor(private config: EnvConfig) {
    super();
  }

  main() {
    this.app.useRouter(this.router);
    console.log(this.config.app_name);
    this.app.run();
  }
}
