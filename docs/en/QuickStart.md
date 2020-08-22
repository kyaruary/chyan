# Quick Start

we create a `cat store` to show how to use habe build a http server

# start a web server

```ts
import { Habe } from "habe";

const app = Habe.createApplication();

app.run();
```

now we start a http server only can see 404

# add a router

```ts
@Controller()
export class CatController {
  @Get()
  getKitty() {
    return "hellos kitty";
  }
}
```

controller represent prefix and organize similar action in it

# add a service
