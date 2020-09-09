import { Constructor } from "../../interface";
import { Injectable } from "../internal/Injectable";

export function Controller(prefix: string = "") {
  const injectRouterMark = (target: Constructor): ControllerMetadata => {
    return { isController: true, prefix };
  };
  return Injectable(injectRouterMark);
}

export type ControllerMetadata = {
  isController: boolean;
  prefix: string;
  middlewares?: Function[];
};
