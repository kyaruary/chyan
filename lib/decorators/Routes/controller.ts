import { RouteMethod } from "../../constant/RouteMethods";
import { DesignMetaKey } from "../../constant/metakey";
import { attachMetadata, fetchMetadata } from "../../core/MetadataStorage";
import { RouterStorage } from "../../core/router";
import { Injectable } from "../../core/Injectable";
import { RouteMetaKey } from "./metakey";
import { Constructor } from "../../types/types";
import { ArgsMetadata, ArgsValueMetadata } from "./args";

export function Controller(prefix = "") {
  return _ControllerExtension(prefix);
}

export function _ControllerExtension(prefix = "", callback?: Function) {
  return Injectable((target) => {
    attachMetadata(RouteMetaKey.prefix, prefix, target);
    return {
      done(instance) {
        const actions = fetchMetadata<string[]>(RouteMetaKey.actions, target) ?? [];
        const controllerMiddlewares = fetchMetadata<Function[]>(RouteMetaKey.middlewares, target) ?? [];
        for (const action of actions) {
          const suffix = fetchMetadata<string>(RouteMetaKey.suffix, target, action)!;
          const method = fetchMetadata<RouteMethod>(RouteMetaKey.method, target, action)!;
          const argTypes = fetchMetadata<Constructor[]>(DesignMetaKey.paramTypes, target, action)!;
          const argsValueMetadata = fetchMetadata<ArgsValueMetadata[]>(RouteMetaKey.args, target, action) ?? [];
          const argsMetadata: ArgsMetadata[] = [];
          for (const avm of argsValueMetadata) {
            argsMetadata[avm.index] = {
              ...avm,
              metatype: argTypes[avm.index],
            };
          }
          const actionMiddlewares = fetchMetadata<Function[]>(RouteMetaKey.middlewares, target, action) ?? [];
          RouterStorage.add(method, prefix, suffix, instance[action].bind(instance), argsMetadata, [...controllerMiddlewares, ...actionMiddlewares]);
        }
        callback?.(instance);
      },
    };
  });
}
