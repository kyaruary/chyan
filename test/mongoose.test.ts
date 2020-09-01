import { model, Document, Schema, Collection, createConnection } from "mongoose";
import { MongoCollection, BaseCollection } from "../lib/decorators/MongoCollection";

@MongoCollection("user")
export class UserModel extends BaseCollection {}
