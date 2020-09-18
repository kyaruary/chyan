import { ActionMetadata, Constructor } from "../../interface";
import { Injectable } from "../internal/Injectable";
import "reflect-metadata";
import { RouteMethod } from "../../constant/RouteMethods";
export const isControllerSymbol = Symbol("is-controller");

export function Controller(prefix: string = "") {
  const injectRouterMark = (target: Constructor): ControllerMetadata => {
    Reflect.defineMetadata(isControllerSymbol, true, target.prototype);
    return { isController: isControllerSymbol, prefix };
  };
  return Injectable(injectRouterMark);
}

export type ControllerMetadata = {
  isController: symbol;
  prefix: string;
  middlewares?: Function[];
};
