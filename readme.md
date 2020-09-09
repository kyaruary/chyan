# Nekochyan

A web framework base on koa & typescript & DI & decorators

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

make sure that your's tsconfig.json file contain this

```json
"compilerOptions": {
    "target": "ES2016", // make sure ioc work
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  }
```
