import { Injectable } from "../core/Injectable";
import { model, Schema } from "mongoose";
import { attachMetadata } from "../core/metadata-storage";

enum MongoMetaKey {
  collectionName = "chyan:mongo-name",
  schema = "chyan:schema",
}

export function MongoCollection(name: string, schema?: Schema) {
  return Injectable((target) => {
    attachMetadata(MongoMetaKey.collectionName, name, target);
    schema && attachMetadata(MongoMetaKey.schema, schema, target);
    return {
      onIns(ot, args) {
        return model(name, schema);
      },
    };
  });
}
