import { Constructor } from "../../interface";
import { Action } from "../internal/Action";
import { Injectable } from "../internal/Injectable";
import { ControllerMetadata } from "./Controller";
import { RouterMetadata } from "./RouterMethods";

// action middleware
export function Middleware(middlewares: Function[]) {
  return (target: any, key?: any, des?: any) => {
    key ? ActionMiddleware(middlewares, target, key, des) : RouterGroupMiddleware(middlewares, target);
  };
}

function ActionMiddleware(middlewares: Function[], target: Object, key: string, des: PropertyDescriptor) {
  const callback = (target: Object, key: string, des: PropertyDescriptor): Partial<RouterMetadata> => ({ middlewares });
  Action(callback)(target, key, des);
}

function RouterGroupMiddleware(middlewares: Function[], target: Constructor) {
  const callback = (): Partial<ControllerMetadata> => ({ middlewares });
  Injectable(callback)(target);
}
