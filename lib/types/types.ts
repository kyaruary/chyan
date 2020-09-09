import { Context } from "koa";
import { InjectLevel } from "../decorators";

export type Constructor = new (...args: any[]) => object;

export type RouterCallback = (c: Context) => any;

export type InjectorMetadata = {
  id: string;
  target: Constructor;
  args: string[];
  meta?: Record;
  level: InjectLevel;
};

export type ActionMetadata = {
  id: string;
  host: string;
  key: string;
  argsType: Constructor[];
  meta?: Record;
};

export type ArgumentsMetadata = {
  host: string;
  key: string;
  position: number;
  meta?: Record;
};

export type PropertyMetadata = {};

export type Record = {
  [key: string]: any;
};
