import { RouterDescriptor } from "../@types/types";
import { Context } from "koa";
import { ArgumentsTypes } from "../constant/ArgumentsTypes";
import { ArgumentsMetadata } from "../interface/mod";

import KoaRouter from "koa-router";
import { Next } from "koa";
import Router from "koa-router";

const router = new KoaRouter();

export class RouterUtils {
  static async add(r: RouterDescriptor) {
    const fullPath = this.generateRouterPath(r.prefix, r.actionDescriptor.suffix);
    const time = new Date();
    console.log(`*** [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}/${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:${time.getSeconds()}] 注入路由 ${fullPath} ,host: ${r.actionDescriptor.hostName}@${r.actionDescriptor.key}`);
    const method = r.actionDescriptor.type.toLowerCase();
    (router as any)[method](fullPath, async (c: Context, next: Next) => {
      const { args } = this.injectArugments(c, r, next);
      // valdiate
      const result = await Reflect.apply(r.actionDescriptor.callback, r.host, [...args]);
      if (result !== undefined) {
        c.body = result;
      }
    });
  }

  private static formatRouter(url: string) {
    return url === "/" ? url : url.replace(/\/$/, "");
  }

  private static generateRouterPath(prefix: string, sub_path: string) {
    return this.formatRouter(`/${prefix}/${sub_path}`.replace(/[/]{2,}/g, "/"));
  }

  private static injectArugments(c: Context, r: RouterDescriptor, next: Next) {
    const args: object[] = [];
    const { body, session, cookie, query, params } = c;
    const argumentsMetadataArr: ArgumentsMetadata[] = [];
    for (const arg of r.args) {
      let object: any;
      switch (arg.type) {
        case ArgumentsTypes.BODY:
          object = arg.field ? body[arg.field] : body;
          break;
        case ArgumentsTypes.COOKIE:
          object = cookie;
          break;
        case ArgumentsTypes.PARAMS:
          object = arg.field ? params[arg.field] : params;
          break;
        case ArgumentsTypes.QUERY:
          object = arg.field ? query[arg.field] : query;
          break;
        case ArgumentsTypes.REQ:
          object = c.req;
          break;
        case ArgumentsTypes.SESSION:
          object = session;
          break;
        case ArgumentsTypes.CONTEXT:
          object = c;
          break;
        case ArgumentsTypes.NEXT:
          object = next;
          break;
        case ArgumentsTypes.FILE:
          object = next; // todo
          break;
        case ArgumentsTypes.FILES:
          object = next; // todo
          break;
        default:
          console.error("arguments can not find type,", arg.type);
          break;
      }
      args[arg.position] = object;
      argumentsMetadataArr.push({ value: object, argType: r.actionDescriptor.argsType[arg.position], metaType: arg.type, field: arg.field });
    }
    return { args, argumentsMetadataArr };
  }

  static getRouter() {
    return router;
  }
}
