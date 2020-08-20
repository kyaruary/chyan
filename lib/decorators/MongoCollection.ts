import { Constructor } from "../@types/types";
import * as Uuid from "uuid";
import { MetaDataStorage } from "../core/metadata";

export function MongoCollection(collectionName: string) {
  return function CollectionDecorator(target: Constructor) {
    target.prototype.id = target.prototype.id ?? Uuid.v4();
    MetaDataStorage.addEntityDescriptor({ name: collectionName, target: target.prototype.id });
  };
}
