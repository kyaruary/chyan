# Chyan

DEVELOPER FRIENDLY NODEJS WEB FRAMEWORK

## Installation

```bash
mkdir your-project && cd your-project
yarn add chyan
yarn tsc --init
```

> make sure that your tsconfig.json file contain this

```json
{
  "compilerOptions": {
    "target": "ES2016",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Quick Start

```ts
import { Get, Controller, Application } from "chyan";
import { ChyanApplication } from "accioo";

@ChyanApplication()
@Controller()
export class App {
  constructor(private router: ChyanRouter, private app: Application) {}

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
