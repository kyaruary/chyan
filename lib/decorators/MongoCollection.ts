import { Constructor } from "../@types/types";
import * as Uuid from "uuid";
import { MetaDataStorage } from "../core/metadata";
import { SchemaDefinition } from "mongoose";

export { Collection as BaseCollection } from "mongoose";
export function MongoCollection(collectionName: string, schema?: SchemaDefinition) {
  return function CollectionDecorator(target: Constructor) {
    target.prototype.id = target.prototype.id || Uuid.v4();
    MetaDataStorage.addEntityDescriptor({ name: collectionName, target: target.prototype.id, schema });
  };
}
