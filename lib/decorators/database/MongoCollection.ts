import { Injectable, attachMetadata, fetchMetadata } from "@chyan/ioc";
import { connection, model, Schema } from "mongoose";

import autoIncrement from "mongoose-auto-increment";

enum MongoMetaKey {
  collectionName = "chyan:mongoose-name",
  schema = "chyan:mongoose-schema",
  increment = "chyan:mongoose-auto-increment",
}

export function MongoCollection(name: string, schema: Schema) {
  return Injectable((target) => {
    attachMetadata(MongoMetaKey.collectionName, name, target);
    schema && attachMetadata(MongoMetaKey.schema, schema, target);
    return {
      packing(ot, args) {
        return model(name, schema);
      },
    };
  });
}

export function AutoIncrement(field: string, startAt = 0, incrementBy = 1) {
  return Injectable((target) => {
    return {
      preparing() {
        autoIncrement.initialize(connection);
        const schema = fetchMetadata(MongoMetaKey.schema, target) ?? new Schema();
        const name = fetchMetadata<string>(MongoMetaKey.collectionName, target);
        (<Schema>schema).plugin(autoIncrement.plugin, { model: name, field, startAt, incrementBy });
      },
    };
  });
}
