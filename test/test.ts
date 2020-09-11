// import { BootstrapApplication, ChyanApplication, Get } from "../lib";
// import serve from "koa-static";
// import { resolve } from "path";

// @ChyanApplication()
// export class Application extends BootstrapApplication {
//   main() {
//     this.app.useRouter(this.router);
//     this.app.useGlobalMiddleware(serve(resolve(process.cwd(), "public")));
//     this.app.run(1234);
//   }
//   @Get()
//   helloWorld() {
//     return "Hello Chyan.co";
//   }
// }
