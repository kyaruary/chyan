import { Constructor } from "../..";
import { RouteMethod } from "../../constant/RouteMethods";
import { DesignMetaKey } from "../../constant/symbol";
import { attachMetadata, fetchMetadata } from "../../core/metadata-storage";
import { RouterStorage } from "../../core/router";
import { Injectable } from "../../core/Injectable";
import { RouteMetaKey } from "./share";

export function Controller(prefix = "") {
  return _ControllerExtension(prefix);
}

export function _ControllerExtension(prefix = "", callback?: Function) {
  return Injectable((target) => {
    attachMetadata(RouteMetaKey.prefix, prefix, target);
    return {
      afterIns(instance: object) {
        const actions = fetchMetadata<string[]>(RouteMetaKey.actions, target)!;
        const controllerMiddlewares = fetchMetadata<Function[]>(RouteMetaKey.middlewares, target) ?? [];
        for (const action of actions) {
          const suffix = fetchMetadata<string>(RouteMetaKey.suffix, target, action)!;
          const method = fetchMetadata<RouteMethod>(RouteMetaKey.method, target, action)!;
          const argTypes = fetchMetadata<Constructor[]>(DesignMetaKey.paramtypes, target, action)!;
          const argFns = fetchMetadata<Function[]>(RouteMetaKey.args, target, action) ?? [];
          const actionMiddlewares = fetchMetadata<Function[]>(RouteMetaKey.middlewares, target, action) ?? [];
          RouterStorage.add(method, prefix, suffix, instance[action].bind(instance), argTypes, [...controllerMiddlewares, ...actionMiddlewares], argFns);
        }
        callback?.(instance);
      },
    };
  });
}
