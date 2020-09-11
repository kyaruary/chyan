import { Chyan } from "../lib";
import { loader } from "../lib/core/loader";
import path from "path";
import { initializer } from "../lib/core/initializer";
import { RouterStorage } from "../lib/core/router";

!(async function () {
  const app = Chyan.createApplication();

  await loader.load([path.resolve(__dirname, "controllers")]);

  await initializer();

  app.useRouter(RouterStorage.getRouter());

  app.run(8033);
})();
