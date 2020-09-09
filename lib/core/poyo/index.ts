import { Mongoose, Schema } from "mongoose";
import { ControllerMetadata, isControllerSymbol, RouterMetadata } from "../../decorators";
import { MongoCollectionMetadata } from "../../decorators/custom/MongoCollection";
import { ActionMetadata, Record } from "../../interface";

import { DatabaseFacade } from "../database";

import { MetadataStorage } from "../metadata-storage";
import { RouterStorage } from "../router";

export class Poyomon {
  async bubbles(id: string, instance: object, metadatas: MetadataStorage): Promise<undefined | object | void> {
    const meta = metadatas.injectorMetadataMap.get(id)!.meta!;
    if (isController(meta)) return initializeController(meta as ControllerMetadata, metadatas.actionMetadataMap.get(id), instance, metadatas);

    if (isMongoCollection(meta)) {
      return await initializeMongoCollection(meta as MongoCollectionMetadata);
    }
  }
}

function initializeController(meta: ControllerMetadata, actionMap: Map<string, ActionMetadata> | undefined, host: object, metadatas: MetadataStorage) {
  if (actionMap) {
    const { prefix } = meta;
    for (const [id, action] of actionMap) {
      if (action.meta?.isRouter) {
        const { suffix, method, middlewares } = action.meta! as RouterMetadata;
        const { argsType, key } = action;
        let getArgsFn: Function[] = [];
        const argumentsMeta = metadatas.argumentMetadataMap.get(id);
        if (argumentsMeta) {
          for (const [id, argMeta] of argumentsMeta) {
            getArgsFn[argMeta.position] = argMeta.meta?.callback;
          }
        }
        RouterStorage.add(method, prefix, suffix, host[key].bind(host), argsType, middlewares ?? [], getArgsFn);
      }
    }
  }
}

let conn: Mongoose | null = null;
async function initializeMongoCollection(meta: MongoCollectionMetadata) {
  if (conn === null) {
    conn = await DatabaseFacade.connectMongodb("mongodb://localhost:27017/test");
  }
  const { name, schema } = meta;
  const m = conn.model(name, new Schema(schema));
  return m;
}

function isMongoCollection(meta?: Record) {
  return !!meta?.isMongoCollection;
}

function isController(meta?: Record) {
  return (<ControllerMetadata>meta).isController === isControllerSymbol;
}

function isMiddleware(meta?: Record) {
  return !!meta?.Middleware;
}

function isService(meta?: Record) {
  return !!meta?.isService;
}
