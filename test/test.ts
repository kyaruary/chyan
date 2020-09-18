import { Chyan } from "../lib";
import { resolve } from "../lib/core/Ioc";
import { loader } from "../lib/core/loader";

(async function () {
  const app = Chyan.createApplication();
  await loader.load(["/controller/abs/path"]);
  await resolve();
  app.useGlobalMiddleware((c, next) => {
    c.body = "hello world";
  });
  app.run(8080);
});
