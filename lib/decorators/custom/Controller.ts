import { Constructor } from "../../interface";
import { Injectable } from "../internal/Injectable";

export const isControllerSymbol = Symbol("is-controller");

export function Controller(prefix: string = "") {
  const injectRouterMark = (target: Constructor): ControllerMetadata => {
    return { isController: isControllerSymbol, prefix };
  };
  return Injectable(injectRouterMark);
}

export type ControllerMetadata = {
  isController: symbol;
  prefix: string;
  middlewares?: Function[];
};
