# Nekochyan

A web framework base on koa & typescript

# Quick Start

```ts
import { ChyanApplication, Controller, Get, BootstrapApplication } from "chyan";

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
```
