import { Action } from "../internal/Action";
import { Injectable } from "../internal/Injectable";
import { ControllerMetadata } from "./Controller";
import { RouterMetadata } from "./RouterMethods";

// action middleware
export function Middleware(middlewares: Function[]) {
  return function ActionDescriptorDecorator(target: Object, key?: string, descriptor?: PropertyDescriptor) {
    return key ? ActionMiddleware(middlewares) : RouterGroupMiddleware(middlewares);
  };
}

function ActionMiddleware(middlewares: Function[]) {
  const callback = (target: Object, key: string, des: PropertyDescriptor): Partial<RouterMetadata> => ({ middlewares });
  return Action(callback);
}

function RouterGroupMiddleware(middlewares: Function[]) {
  const callback = (): Partial<ControllerMetadata> => ({ middlewares });
  return Injectable(callback);
}
