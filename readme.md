# Chyan

A web framework base on koa & typescript & DI & decorators

# Quick Start

```ts
import { ChyanApplication, Get, BootstrapApplication } from "chyan";

@ChyanApplication()
export class Application extends BootstrapApplication {
  main() {
    this.app.useRouter(this.router);
    this.app.run();
  }

  @Get()
  helloWorld() {
    return "chyan.co";
  }
}
```

make sure that your's tsconfig.json file contain this

```json
"compilerOptions": {
    "target": "ES2016",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  }
```
