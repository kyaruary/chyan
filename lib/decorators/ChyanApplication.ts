import { BootstrapApplication } from "../core/BootstrapApplication";
import { Injectable } from "../core/Injectable";
import { resolve } from "../core/Ioc";
import { loader } from "../core/loader";
import { _ControllerExtension } from "./Routes/controller";

export function ChyanApplication() {
  setImmediate(resolve);
  return _ControllerExtension("", callback);
}

async function callback(app: object) {
  if (app instanceof BootstrapApplication) {
    const controllers = (<string[]>[]).concat(app.scanner);
    if (controllers.length !== 0) {
      await loader.load(controllers);
      await resolve();
    }
    setImmediate(app.start);
  }
}
