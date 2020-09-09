import { initializer } from "../../core/Ioc/Ioc";
import { Injectable } from "./Injectable";

function init() {
  setImmediate(initializer);
  return { isApplication: true };
}

export function ChyanApplication() {
  return Injectable(init);
}
