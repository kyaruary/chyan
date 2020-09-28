import { Injectable } from "../core/Injectable";
import { connection, model, Schema } from "mongoose";
import { attachMetadata, fetchMetadata } from "../core/metadata-storage";
import autoIncrement from "mongoose-auto-increment";
enum MongoMetaKey {
  collectionName = "chyan:mongo-name",
  schema = "chyan:schema",
  increment = "chyan:auto-increment",
}

export function MongoCollection(name: string, schema?: Schema) {
  return Injectable((target) => {
    attachMetadata(MongoMetaKey.collectionName, name, target);
    schema && attachMetadata(MongoMetaKey.schema, schema, target);
    console.log("okkoas");
    return {
      onIns(ot, args) {
        return model(name, schema);
      },
    };
  });
}

export function AutoIncrement(field: string) {
  return Injectable((target) => {
    return {
      beforeIns() {
        autoIncrement.initialize(connection);
        const schema = fetchMetadata(MongoMetaKey.schema, target) ?? new Schema();
        if (!schema) {
          throw "Must Provide A Model Schema Via MongoCollection Second Parameter";
        }
        const name = fetchMetadata(MongoMetaKey.collectionName, target);
        (<Schema>schema).plugin(autoIncrement.plugin, { model: name, field });
      },
    };
  });
}
