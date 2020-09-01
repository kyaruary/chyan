import { Constructor } from "../@types/types";
import { SchemaDefinition } from "mongoose";
export { Collection as BaseCollection } from "mongoose";
export declare function MongoCollection(collectionName: string, schema?: SchemaDefinition): (target: Constructor) => void;
