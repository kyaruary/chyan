import { Context as KoaContext } from "koa";

export interface Context extends KoaContext {
  isStatic: boolean | undefined;
}
