import { Constructor } from "../@types/types";
import { SchemaDefinition } from "mongoose";
export declare function MongoCollection(collectionName: string, schema?: SchemaDefinition): (target: Constructor) => void;
