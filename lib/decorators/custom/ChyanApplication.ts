import { initializer } from "../../core/initializer";
import { Injectable } from "../internal/Injectable";

function init() {
  setImmediate(initializer);
  return { isApplication: true, prefix: "" };
}

export function ChyanApplication() {
  return Injectable(init);
}
