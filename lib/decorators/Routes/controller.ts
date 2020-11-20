import { RouteMethod } from "../../constant/RouteMethods";
import { RouterMetaStorage } from "../../core/RouterMetaStorage";
import { attachMetadata, MetaKey, fetchMetadata, Injectable } from "accioo";
import { RouteMetaKey } from "./metakey";
import { Constructor } from "../../types/types";
import { ArgsMetadata, ArgsValueMetadata } from "./args";

export function Controller(prefix = "") {
  return Injectable((target) => {
    attachMetadata(RouteMetaKey.prefix, prefix, target);
    return {
      done(instance) {
        const actions = fetchMetadata<string[]>(RouteMetaKey.actions, target) ?? [];
        const controllerMiddlewares = fetchMetadata<Function[]>(RouteMetaKey.middlewares, target) ?? [];
        for (const action of actions) {
          const suffix = fetchMetadata<string>(RouteMetaKey.suffix, target, action)!;
          const method = fetchMetadata<RouteMethod>(RouteMetaKey.method, target, action)!;
          const argTypes = fetchMetadata<Constructor[]>(MetaKey.paramTypes, target, action)!;
          const argsValueMetadata = fetchMetadata<ArgsValueMetadata[]>(RouteMetaKey.args, target, action) ?? [];
          const argsMetadata: ArgsMetadata[] = [];
          for (const avm of argsValueMetadata) {
            argsMetadata[avm.index] = {
              ...avm,
              metatype: argTypes[avm.index],
            };
          }
          const actionMiddlewares = fetchMetadata<Function[]>(RouteMetaKey.middlewares, target, action) ?? [];
          RouterMetaStorage.collect(method, prefix, suffix, instance[action].bind(instance), argsMetadata, [...controllerMiddlewares, ...actionMiddlewares]);
        }
      },
    };
  });
}
