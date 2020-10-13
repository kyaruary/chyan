import { Injectable } from "../core/Injectable";
import { connection, model, Schema } from "mongoose";
import { attachMetadata, fetchMetadata } from "../core/MetadataStorage";
import autoIncrement from "mongoose-auto-increment";
import { chyanLogger } from "../utils/chyanlog";

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
      onIns(ot, args) {
        return model(name, schema);
      },
    };
  });
}

export function AutoIncrement(field: string, startAt = 0, incrementBy = 1) {
  return Injectable((target) => {
    return {
      beforeIns() {
        autoIncrement.initialize(connection);
        const schema = fetchMetadata(MongoMetaKey.schema, target) ?? new Schema();
        if (!schema) {
          chyanLogger.fatal(`Must Provide A Model Schema Via MongoCollection Second Parameter`);
          process.exit();
        }
        const name = fetchMetadata<string>(MongoMetaKey.collectionName, target);
        (<Schema>schema).plugin(autoIncrement.plugin, { model: name, field, startAt, incrementBy });
      },
    };
  });
}
