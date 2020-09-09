import { Constructor } from "../../@types/types";
import { SchemaDefinition } from "mongoose";
import { Injectable } from "../internal/Injectable";

export type MongoCollectionMetadata = {
  name: string;
  schema?: SchemaDefinition;
  isMongoCollection: boolean;
};

export function MongoCollection(name: string, schema?: SchemaDefinition) {
  function callback(): MongoCollectionMetadata {
    return { name, schema, isMongoCollection: true };
  }
  return Injectable(callback);
}
