import mongoose, { Document, Aggregate, ClientSession, CreateQuery, DocumentDefinition, DocumentQuery, FilterQuery, ModelMapReduceOption, ModelOptions, ModelPopulateOptions, ModelProperties, ModelUpdateOptions, Query, QueryFindBaseOptions, QueryFindOneAndRemoveOptions, QueryFindOneAndUpdateOptions, QueryFindOptions, SaveOptions, Schema, UpdateQuery, MongooseFilterQuery, Collection, Connection, MongooseUpdateQuery } from "mongoose";
import mongodb, { BulkWriteOpResultObject, ChangeStream, ChangeStreamOptions, CollectionBulkWriteOptions, CollectionCreateOptions, FindAndModifyWriteOpResultObject } from "mongodb";

export class Model<T extends Document = Document> implements BaseModel<T> {
  base!: typeof import("mongoose");
  baseModelName: string | undefined;
  discriminators: { [name: string]: Model<T> } | undefined;
  modelName!: string;
  watch(pipeline?: object[], options?: ChangeStreamOptions & { session?: ClientSession | undefined }): ChangeStream<any> {
    return {} as any;
  }
  translateAliases(raw: any) {
    return {} as any;
  }
  bulkWrite(writes: any[], cb?: (err: any, res: BulkWriteOpResultObject) => void): Promise<BulkWriteOpResultObject>;
  bulkWrite(writes: any[], options?: CollectionBulkWriteOptions): Promise<BulkWriteOpResultObject>;
  bulkWrite(writes: any[], options: CollectionBulkWriteOptions, cb: (err: any, res: BulkWriteOpResultObject) => void): void;
  bulkWrite(writes: any, options?: any, cb?: any) {
    return {} as any;
  }
  model<U extends Document>(name: string): Model<U> {
    return {} as any;
  }
  $where(argument: string | Function): DocumentQuery<T, T, {}> {
    return {} as any;
  }
  aggregate<U = any>(aggregations?: any[]): Aggregate<U[]>;
  aggregate<U = any>(aggregations: any[], cb: Function): Promise<U[]>;
  aggregate(aggregations?: any, cb?: any) {
    return {} as any;
  }
  count(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, count: number) => void): Query<number> {
    return {} as any;
  }
  countDocuments(callback?: (err: any, count: number) => void): Query<number>;
  countDocuments(criteria: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, count: number) => void): Query<number>;
  countDocuments(criteria?: any, callback?: any) {
    return {} as any;
  }
  estimatedDocumentCount(callback?: (err: any, count: number) => void): Query<number>;
  estimatedDocumentCount(options: any, callback?: (err: any, count: number) => void): Query<number>;
  estimatedDocumentCount(options?: any, callback?: any) {
    return {} as any;
  }
  create<TCreate = T>(doc: CreateQuery<TCreate>, options?: SaveOptions): Promise<T>;
  create<TCreate = T>(doc: CreateQuery<TCreate>, callback?: (err: any, res: T[]) => void): Promise<T>;
  create<TCreate = T>(docs: CreateQuery<TCreate>[], callback?: (err: any, res: T[]) => void): Promise<T[]>;
  create<TCreate = T>(docs: CreateQuery<TCreate>[], options?: SaveOptions, callback?: (err: any, res: T[]) => void): Promise<T[]>;
  create<TCreate = T>(...docs: CreateQuery<TCreate>[]): Promise<T>;
  create(docs?: any, options?: any, callback?: any, ...rest: any[]) {
    return {} as any;
  }
  createCollection(options?: CollectionCreateOptions, cb?: (err: any) => void): Promise<void> {
    return {} as any;
  }
  discriminator<U extends Document>(name: string, schema: Schema<any>, value?: string): Model<U>;
  discriminator<U extends Document, M extends Model<U>>(name: string, schema: Schema<any>, value?: string): M;
  discriminator(name: any, schema: any, value?: any) {
    return {} as any;
  }
  distinct(field: string, callback?: (err: any, res: any[]) => void): Query<any[]>;
  distinct(field: string, conditions: any, callback?: (err: any, res: any[]) => void): Query<any[]>;
  distinct(field: any, conditions?: any, callback?: any) {
    return {} as any;
  }
  syncIndexes(options: object | null | undefined, callback: (err: any) => void): void;
  syncIndexes(options?: object | null): Promise<void>;
  syncIndexes(options?: any, callback?: any) {
    return {} as any;
  }
  listIndexes(callback: (err: any) => void): void;
  listIndexes(): Promise<void>;
  listIndexes(callback?: any) {
    return {} as any;
  }
  ensureIndexes(callback?: (err: any) => void): Promise<void>;
  ensureIndexes(options: any, callback?: (err: any) => void): Promise<void>;
  ensureIndexes(options?: any, callback?: any) {
    return {} as any;
  }
  createIndexes(cb?: (err: any) => void): Promise<void> {
    return {} as any;
  }
  exists(filter: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, res: boolean) => void): Promise<boolean> {
    return {} as any;
  }
  find(callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, {}>;
  find(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, {}>;
  find(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, projection?: any, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, {}>;
  find(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, projection?: any, options?: { lean: true } & Pick<QueryFindOptions, "populate" | "batchSize" | "comment" | "hint" | "limit" | "maxscan" | "readPreference" | "skip" | "snapshot" | "sort" | "tailable" | "collation" | "explain" | "projection" | "session">, callback?: (err: any, res: T[]) => void): Query<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>[]>;
  find(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, projection?: any, options?: QueryFindOptions, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, {}>;
  find(conditions?: any, projection?: any, options?: any, callback?: any) {
    return {} as any;
  }
  findById(id: any, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findById(id: any, projection: any, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findById(id: any, projection: any, options: { lean: true } & Pick<QueryFindBaseOptions, "populate" | "collation" | "explain" | "projection" | "session">, callback?: (err: any, res: T | null) => void): Query<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>;
  findById(id: any, projection: any, options: QueryFindBaseOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findById(id: any, projection?: any, options?: any, callback?: any) {
    return {} as any;
  }
  findByIdAndRemove(): DocumentQuery<T | null, T, {}>;
  findByIdAndRemove(id: any, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findByIdAndRemove(id: any, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: FindAndModifyWriteOpResultObject<T | null>) => void): Query<FindAndModifyWriteOpResultObject<T | null>>;
  findByIdAndRemove(id: any, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findByIdAndRemove(id?: any, options?: any, callback?: any) {
    return {} as any;
  }
  findByIdAndDelete(): DocumentQuery<T | null, T, {}>;
  findByIdAndDelete(id: any, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findByIdAndDelete(id: any, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: FindAndModifyWriteOpResultObject<T | null>) => void): Query<FindAndModifyWriteOpResultObject<T | null>>;
  findByIdAndDelete(id: any, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findByIdAndDelete(id?: any, options?: any, callback?: any) {
    return {} as any;
  }
  findByIdAndUpdate(): DocumentQuery<T | null, T, {}>;
  findByIdAndUpdate(id: any, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findByIdAndUpdate(id: any, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: { rawResult: true } & { upsert: true } & { new: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, res: T) => void): DocumentQuery<T, T, {}>;
  findByIdAndUpdate(id: any, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: { upsert: true; new: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, res: FindAndModifyWriteOpResultObject<T>) => void): Query<FindAndModifyWriteOpResultObject<T>>;
  findByIdAndUpdate(id: any, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: { rawResult: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, res: FindAndModifyWriteOpResultObject<T | null>) => void): Query<FindAndModifyWriteOpResultObject<T | null>>;
  findByIdAndUpdate(id: any, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: { lean: true } & Pick<QueryFindOneAndUpdateOptions, "sort" | "projection" | "session" | "new" | "upsert" | "runValidators" | "setDefaultsOnInsert" | "context" | "multipleCastError" | "fields" | "arrayFilters" | "omitUndefined" | "timestamps" | "useFindAndModify" | "maxTimeMS" | "select" | "rawResult" | "strict">, callback?: (err: any, res: Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>) => void): Query<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>;
  findByIdAndUpdate(id: any, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: QueryFindOneAndUpdateOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findByIdAndUpdate(id?: any, update?: any, options?: any, callback?: any) {
    return {} as any;
  }
  findOne(conditions?: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findOne(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, projection: any, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findOne(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, projection: any, options: { lean: true } & Pick<QueryFindBaseOptions, "populate" | "collation" | "explain" | "projection" | "session">, callback?: (err: any, res: T | null) => void): Query<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>;
  findOne(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, projection: any, options: QueryFindBaseOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findOne(conditions?: any, projection?: any, options?: any, callback?: any) {
    return {} as any;
  }
  findOneAndRemove(): DocumentQuery<T | null, T, {}>;
  findOneAndRemove(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findOneAndRemove(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: { rawResult: true } & QueryFindOneAndRemoveOptions, callback?: (err: any, doc: FindAndModifyWriteOpResultObject<T | null>, res: any) => void): Query<FindAndModifyWriteOpResultObject<T | null>>;
  findOneAndRemove(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findOneAndRemove(conditions?: any, options?: any, callback?: any) {
    return {} as any;
  }
  findOneAndDelete(): DocumentQuery<T | null, T, {}>;
  findOneAndDelete(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findOneAndDelete(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: { rawResult: true } & QueryFindOneAndRemoveOptions, callback?: (err: any, doc: FindAndModifyWriteOpResultObject<T | null>, res: any) => void): Query<FindAndModifyWriteOpResultObject<T | null>>;
  findOneAndDelete(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, {}>;
  findOneAndDelete(conditions?: any, options?: any, callback?: any) {
    return {} as any;
  }
  findOneAndUpdate(): DocumentQuery<T | null, T, {}>;
  findOneAndUpdate(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null, T, {}>;
  findOneAndUpdate(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: { rawResult: true } & { upsert: true; new: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, doc: FindAndModifyWriteOpResultObject<T>, res: any) => void): Query<FindAndModifyWriteOpResultObject<T>>;
  findOneAndUpdate(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: { upsert: true; new: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, doc: T, res: any) => void): DocumentQuery<T, T, {}>;
  findOneAndUpdate(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: { rawResult: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, doc: FindAndModifyWriteOpResultObject<T | null>, res: any) => void): Query<FindAndModifyWriteOpResultObject<T | null>>;
  findOneAndUpdate(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: { lean: true } & Pick<QueryFindOneAndUpdateOptions, "sort" | "projection" | "session" | "new" | "upsert" | "runValidators" | "setDefaultsOnInsert" | "context" | "multipleCastError" | "fields" | "arrayFilters" | "omitUndefined" | "timestamps" | "useFindAndModify" | "maxTimeMS" | "select" | "rawResult" | "strict">, callback?: (err: any, doc: Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>, res: any) => void): Query<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>;
  findOneAndUpdate(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, update: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: QueryFindOneAndUpdateOptions, callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null, T, {}>;
  findOneAndUpdate(conditions?: any, update?: any, options?: any, callback?: any) {
    return {} as any;
  }
  geoSearch(conditions: any, options: { near: number[]; maxDistance: number; limit?: number | undefined; lean?: boolean | undefined }, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, {}> {
    return {} as any;
  }
  hydrate(obj: any): T {
    return {} as any;
  }
  insertMany(docs: any[], callback?: (error: any, docs: T[]) => void): Promise<T[]>;
  insertMany(docs: any[], options?: { ordered?: boolean | undefined; rawResult?: boolean | undefined } & ModelOptions, callback?: (error: any, docs: T[]) => void): Promise<T[]>;
  insertMany(doc: any, callback?: (error: any, doc: T) => void): Promise<T>;
  insertMany(doc: any, options?: { ordered?: boolean | undefined; rawResult?: boolean | undefined } & ModelOptions, callback?: (error: any, doc: T) => void): Promise<T>;
  insertMany(doc: any, options?: any, callback?: any) {
    return {} as any;
  }
  init(callback?: (err: any) => void): Promise<T> {
    return {} as any;
  }
  mapReduce<Key, Value>(o: ModelMapReduceOption<T, Key, Value>, callback?: (err: any, res: any) => void): Promise<any> {
    return {} as any;
  }
  populate(docs: any[], options: ModelPopulateOptions | ModelPopulateOptions[], callback?: (err: any, res: T[]) => void): Promise<T[]>;
  populate<T>(docs: any, options: ModelPopulateOptions | ModelPopulateOptions[], callback?: (err: any, res: T) => void): Promise<T>;
  populate(docs: any, options: any, callback?: any) {
    return {} as any;
  }
  remove(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any) => void): Query<{ ok?: number | undefined; n?: number | undefined } & { deletedCount?: number | undefined }> {
    return {} as any;
  }
  deleteOne(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any) => void): Query<{ ok?: number | undefined; n?: number | undefined } & { deletedCount?: number | undefined }>;
  deleteOne(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: ModelOptions, callback?: (err: any) => void): Query<{ ok?: number | undefined; n?: number | undefined } & { deletedCount?: number | undefined }>;
  deleteOne(conditions: any, options?: any, callback?: any) {
    return {} as any;
  }
  deleteMany(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any) => void): Query<{ ok?: number | undefined; n?: number | undefined } & { deletedCount?: number | undefined }>;
  deleteMany(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: ModelOptions, callback?: (err: any) => void): Query<{ ok?: number | undefined; n?: number | undefined } & { deletedCount?: number | undefined }>;
  deleteMany(conditions: any, options?: any, callback?: any) {
    return {} as any;
  }
  replaceOne(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, replacement: any, callback?: (err: any, raw: any) => void): Query<any> {
    return {} as any;
  }
  update(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, doc: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, raw: any) => void): Query<any>;
  update(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, doc: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: ModelUpdateOptions, callback?: (err: any, raw: any) => void): Query<any>;
  update(conditions: any, doc: any, options?: any, callback?: any) {
    return {} as any;
  }
  updateOne(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, doc: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, raw: any) => void): Query<any>;
  updateOne(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, doc: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: ModelUpdateOptions, callback?: (err: any, raw: any) => void): Query<any>;
  updateOne(conditions: any, doc: any, options?: any, callback?: any) {
    return {} as any;
  }
  updateMany(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, doc: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, callback?: (err: any, raw: any) => void): Query<any>;
  updateMany(conditions: MongooseFilterQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, doc: MongooseUpdateQuery<Pick<T, Exclude<keyof T, "increment" | "model" | "$isDeleted" | "remove" | "deleteOne" | "save" | "__v" | "$isDefault" | "$session" | "depopulate" | "equals" | "execPopulate" | "isDirectSelected" | "get" | "init" | "inspect" | "invalidate" | "isDirectModified" | "isInit" | "isModified" | "isSelected" | "markModified" | "modifiedPaths" | "populate" | "populated" | "set" | "overwrite" | "toJSON" | "toObject" | "toString" | "unmarkModified" | "replaceOne" | "update" | "updateOne" | "validate" | "validateSync" | "errors" | "isNew" | "schema" | "$locals" | "id" | "addListener" | "on" | "once" | "removeListener" | "off" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners" | "rawListeners" | "emit" | "listenerCount" | "prependListener" | "prependOnceListener" | "eventNames" | "collection" | "db">>>, options: ModelUpdateOptions, callback?: (err: any, raw: any) => void): Query<any>;
  updateMany(conditions: any, doc: any, options?: any, callback?: any) {
    return {} as any;
  }
  where(path: string, val?: any): Query<any> {
    return {} as any;
  }
  addListener(event: string | symbol, listener: (...args: any[]) => void): this {
    return {} as any;
  }
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    return {} as any;
  }
  once(event: string | symbol, listener: (...args: any[]) => void): this {
    return {} as any;
  }
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
    return {} as any;
  }
  off(event: string | symbol, listener: (...args: any[]) => void): this {
    return {} as any;
  }
  removeAllListeners(event?: string | symbol): this {
    return {} as any;
  }
  setMaxListeners(n: number): this {
    return {} as any;
  }
  getMaxListeners(): number {
    return {} as any;
  }
  listeners(event: string | symbol): Function[] {
    return {} as any;
  }
  rawListeners(event: string | symbol): Function[] {
    return {} as any;
  }
  emit(event: string | symbol, ...args: any[]): boolean {
    return {} as any;
  }
  listenerCount(type: string | symbol): number {
    return {} as any;
  }
  prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
    return {} as any;
  }
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
    return {} as any;
  }
  eventNames(): (string | symbol)[] {
    return {} as any;
  }
  collection!: Collection;
  db!: Connection;
  schema!: Schema<any>;
}

interface BaseModel<T extends Document, QueryHelpers = {}> extends NodeJS.EventEmitter, ModelProperties {
  base: typeof mongoose;

  baseModelName: string | undefined;

  discriminators: { [name: string]: Model<any> } | undefined;

  modelName: string;

  watch(pipeline?: object[], options?: mongodb.ChangeStreamOptions & { session?: ClientSession }): mongodb.ChangeStream;

  translateAliases(raw: any): any;

  bulkWrite(writes: any[], cb?: (err: any, res: mongodb.BulkWriteOpResultObject) => void): Promise<mongodb.BulkWriteOpResultObject>;
  bulkWrite(writes: any[], options?: mongodb.CollectionBulkWriteOptions): Promise<mongodb.BulkWriteOpResultObject>;
  bulkWrite(writes: any[], options: mongodb.CollectionBulkWriteOptions, cb: (err: any, res: mongodb.BulkWriteOpResultObject) => void): void;

  model<U extends Document>(name: string): Model<U>;

  $where(argument: string | Function): DocumentQuery<T, T, QueryHelpers> & QueryHelpers;

  aggregate<U = any>(aggregations?: any[]): Aggregate<U[]>;
  aggregate<U = any>(aggregations: any[], cb: Function): Promise<U[]>;

  count(conditions: FilterQuery<T>, callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;

  countDocuments(callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;
  countDocuments(criteria: FilterQuery<T>, callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;

  estimatedDocumentCount(callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;
  estimatedDocumentCount(options: any, callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;

  create<TCreate = T>(doc: CreateQuery<TCreate>, options?: SaveOptions): Promise<T>;
  create<TCreate = T>(doc: CreateQuery<TCreate>, callback?: (err: any, res: T[]) => void): Promise<T>;
  create<TCreate = T>(docs: CreateQuery<TCreate>[], callback?: (err: any, res: T[]) => void): Promise<T[]>;
  create<TCreate = T>(docs: CreateQuery<TCreate>[], options?: SaveOptions, callback?: (err: any, res: T[]) => void): Promise<T[]>;
  create<TCreate = T>(...docs: CreateQuery<TCreate>[]): Promise<T>;

  createCollection(options?: mongodb.CollectionCreateOptions, cb?: (err: any) => void): Promise<void>;

  discriminator<U extends Document>(name: string, schema: Schema, value?: string): Model<U>;

  discriminator<U extends Document, M extends Model<U>>(name: string, schema: Schema, value?: string): M;

  distinct(field: string, callback?: (err: any, res: any[]) => void): Query<any[]> & QueryHelpers;
  distinct(field: string, conditions: any, callback?: (err: any, res: any[]) => void): Query<any[]> & QueryHelpers;

  syncIndexes(options: object | null | undefined, callback: (err: any) => void): void;
  syncIndexes(options?: object | null): Promise<void>;

  listIndexes(callback: (err: any) => void): void;
  listIndexes(): Promise<void>;

  ensureIndexes(callback?: (err: any) => void): Promise<void>;
  ensureIndexes(options: any, callback?: (err: any) => void): Promise<void>;

  createIndexes(cb?: (err: any) => void): Promise<void>;

  exists(filter: FilterQuery<T>, callback?: (err: any, res: boolean) => void): Promise<boolean>;

  find(callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, QueryHelpers> & QueryHelpers;
  find(conditions: FilterQuery<T>, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, QueryHelpers> & QueryHelpers;
  find(conditions: FilterQuery<T>, projection?: any | null, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, QueryHelpers> & QueryHelpers;
  find(conditions: FilterQuery<T>, projection?: any | null, options?: { lean: true } & Omit<QueryFindOptions, "lean">, callback?: (err: any, res: T[]) => void): Query<DocumentDefinition<T>[]> & QueryHelpers;
  find(conditions: FilterQuery<T>, projection?: any | null, options?: QueryFindOptions, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, QueryHelpers> & QueryHelpers;

  findById(id: any | string | number, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findById(id: any | string | number, projection: any, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findById(id: any | string | number, projection: any, options: { lean: true } & Omit<QueryFindBaseOptions, "lean">, callback?: (err: any, res: T | null) => void): Query<DocumentDefinition<T>> & QueryHelpers;
  findById(id: any | string | number, projection: any, options: QueryFindBaseOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  findByIdAndRemove(): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findByIdAndRemove(id: any | number | string, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findByIdAndRemove(id: any | number | string, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T | null>) => void): Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
  findByIdAndRemove(id: any | number | string, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  findByIdAndDelete(): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findByIdAndDelete(id: any | number | string, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findByIdAndDelete(id: any | number | string, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T | null>) => void): Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
  findByIdAndDelete(id: any | number | string, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  findByIdAndUpdate(): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findByIdAndUpdate(id: any | number | string, update: UpdateQuery<T>, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findByIdAndUpdate(id: any | number | string, update: UpdateQuery<T>, options: { rawResult: true } & { upsert: true } & { new: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, res: T) => void): DocumentQuery<T, T, QueryHelpers> & QueryHelpers;
  findByIdAndUpdate(id: any | number | string, update: UpdateQuery<T>, options: { upsert: true; new: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T>) => void): Query<mongodb.FindAndModifyWriteOpResultObject<T>> & QueryHelpers;
  findByIdAndUpdate(id: any | number | string, update: UpdateQuery<T>, options: { rawResult: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T | null>) => void): Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
  findByIdAndUpdate(id: any | number | string, update: UpdateQuery<T>, options: { lean: true } & Omit<QueryFindOneAndUpdateOptions, "lean">, callback?: (err: any, res: DocumentDefinition<T>) => void): Query<DocumentDefinition<T>> & QueryHelpers;
  findByIdAndUpdate(id: any | number | string, update: UpdateQuery<T>, options: QueryFindOneAndUpdateOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  findOne(conditions?: FilterQuery<T>, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findOne(conditions: FilterQuery<T>, projection: any, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findOne(conditions: FilterQuery<T>, projection: any, options: { lean: true } & Omit<QueryFindBaseOptions, "lean">, callback?: (err: any, res: T | null) => void): Query<DocumentDefinition<T>> & QueryHelpers;
  findOne(conditions: FilterQuery<T>, projection: any, options: QueryFindBaseOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  findOneAndRemove(): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findOneAndRemove(conditions: FilterQuery<T>, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findOneAndRemove(conditions: FilterQuery<T>, options: { rawResult: true } & QueryFindOneAndRemoveOptions, callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T | null>, res: any) => void): Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
  findOneAndRemove(conditions: FilterQuery<T>, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  findOneAndDelete(): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findOneAndDelete(conditions: FilterQuery<T>, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findOneAndDelete(conditions: FilterQuery<T>, options: { rawResult: true } & QueryFindOneAndRemoveOptions, callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T | null>, res: any) => void): Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
  findOneAndDelete(conditions: FilterQuery<T>, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  findOneAndUpdate(): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findOneAndUpdate(conditions: FilterQuery<T>, update: UpdateQuery<T>, callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  findOneAndUpdate(conditions: FilterQuery<T>, update: UpdateQuery<T>, options: { rawResult: true } & { upsert: true; new: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T>, res: any) => void): Query<mongodb.FindAndModifyWriteOpResultObject<T>> & QueryHelpers;
  findOneAndUpdate(conditions: FilterQuery<T>, update: UpdateQuery<T>, options: { upsert: true; new: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, doc: T, res: any) => void): DocumentQuery<T, T, QueryHelpers> & QueryHelpers;
  findOneAndUpdate(conditions: FilterQuery<T>, update: UpdateQuery<T>, options: { rawResult: true } & QueryFindOneAndUpdateOptions, callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T | null>, res: any) => void): Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
  findOneAndUpdate(conditions: FilterQuery<T>, update: UpdateQuery<T>, options: { lean: true } & Omit<QueryFindOneAndUpdateOptions, "lean">, callback?: (err: any, doc: DocumentDefinition<T>, res: any) => void): Query<DocumentDefinition<T>> & QueryHelpers;
  findOneAndUpdate(conditions: FilterQuery<T>, update: UpdateQuery<T>, options: QueryFindOneAndUpdateOptions, callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  geoSearch(
    conditions: any,
    options: {
      near: number[];

      maxDistance: number;

      limit?: number;

      lean?: boolean;
    },
    callback?: (err: any, res: T[]) => void
  ): DocumentQuery<T[], T, QueryHelpers> & QueryHelpers;

  hydrate(obj: any): T;

  insertMany(docs: any[], callback?: (error: any, docs: T[]) => void): Promise<T[]>;
  insertMany(docs: any[], options?: { ordered?: boolean; rawResult?: boolean } & ModelOptions, callback?: (error: any, docs: T[]) => void): Promise<T[]>;
  insertMany(doc: any, callback?: (error: any, doc: T) => void): Promise<T>;
  insertMany(doc: any, options?: { ordered?: boolean; rawResult?: boolean } & ModelOptions, callback?: (error: any, doc: T) => void): Promise<T>;

  init(callback?: (err: any) => void): Promise<T>;

  mapReduce<Key, Value>(o: ModelMapReduceOption<T, Key, Value>, callback?: (err: any, res: any) => void): Promise<any>;

  populate(docs: any[], options: ModelPopulateOptions | ModelPopulateOptions[], callback?: (err: any, res: T[]) => void): Promise<T[]>;
  populate<T>(docs: any, options: ModelPopulateOptions | ModelPopulateOptions[], callback?: (err: any, res: T) => void): Promise<T>;

  remove(conditions: FilterQuery<T>, callback?: (err: any) => void): Query<mongodb.DeleteWriteOpResultObject["result"] & { deletedCount?: number }> & QueryHelpers;
  deleteOne(conditions: FilterQuery<T>, callback?: (err: any) => void): Query<mongodb.DeleteWriteOpResultObject["result"] & { deletedCount?: number }> & QueryHelpers;
  deleteOne(conditions: FilterQuery<T>, options: ModelOptions, callback?: (err: any) => void): Query<mongodb.DeleteWriteOpResultObject["result"] & { deletedCount?: number }> & QueryHelpers;
  deleteMany(conditions: FilterQuery<T>, callback?: (err: any) => void): Query<mongodb.DeleteWriteOpResultObject["result"] & { deletedCount?: number }> & QueryHelpers;
  deleteMany(conditions: FilterQuery<T>, options: ModelOptions, callback?: (err: any) => void): Query<mongodb.DeleteWriteOpResultObject["result"] & { deletedCount?: number }> & QueryHelpers;

  replaceOne(conditions: FilterQuery<T>, replacement: any, callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;

  update(conditions: FilterQuery<T>, doc: UpdateQuery<T>, callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
  update(conditions: FilterQuery<T>, doc: UpdateQuery<T>, options: ModelUpdateOptions, callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
  updateOne(conditions: FilterQuery<T>, doc: UpdateQuery<T>, callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
  updateOne(conditions: FilterQuery<T>, doc: UpdateQuery<T>, options: ModelUpdateOptions, callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
  updateMany(conditions: FilterQuery<T>, doc: UpdateQuery<T>, callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
  updateMany(conditions: FilterQuery<T>, doc: UpdateQuery<T>, options: ModelUpdateOptions, callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;

  where(path: string, val?: any): Query<any> & QueryHelpers;
}
