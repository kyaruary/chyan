import { RouterDescriptor, ArgumentsDescriptor, FileInfo } from "../@types/types";

import { ArgumentsTypes } from "../constant/ArgumentsTypes";
import { ArgumentsMetadata } from "../interface/mod";

import KoaRouter from "koa-router";
import { Context } from "./Context";
import { Next } from "../interface";
import { MiddlewareStorage } from "./middleware-storage";
import multer from "@koa/multer";

const router = new KoaRouter();

export class RouterUtils {
  static async add(r: RouterDescriptor) {
    const fullPath = this.generateRouterPath(r.prefix, r.actionDescriptor.suffix);
    const time = new Date();
    console.log(
      `*** [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}/${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:${time.getSeconds()}] 注入路由 ${r.actionDescriptor.type} ${fullPath} ,host: ${r.actionDescriptor.hostName}@${r.actionDescriptor.key}`
    );
    const method = r.actionDescriptor.type.toLowerCase();

    const middleware = this.getUploadMiddleware(r.args);

    (router as any)[method](fullPath, ...middleware, async (c: Context, next: Next) => {
      const { args } = this.injectArugments(c, r, next);
      // valdiate
      const result = await Reflect.apply(r.actionDescriptor.callback, r.host, [...args]);
      MiddlewareStorage.interceptor.apply(c, result);
    });
  }

  private static formatRouter(url: string) {
    return url === "/" ? url : url.replace(/\/$/, "");
  }

  private static getUploadMiddleware(args: ArgumentsDescriptor[]): Function[] {
    const middleware: Function[] = [];
    const multerOptions: any[] = [];
    // inject files
    for (const arg of args) {
      if (arg.type === ArgumentsTypes.FILE) {
        const upload = multer(arg.upload?.options);
        middleware.push(upload.single(arg.field));
        break;
      }
      if (arg.type === ArgumentsTypes.FILES) {
        const upload = multer(arg.upload?.options);
        middleware.push(upload.fields(arg.upload?.fields || []));
        break;
      }
    }
    return middleware;
  }

  private static generateRouterPath(prefix: string, sub_path: string) {
    return this.formatRouter(`/${prefix}/${sub_path}`.replace(/[/]{2,}/g, "/"));
  }

  private static injectArugments(c: Context, r: RouterDescriptor, next: Next) {
    const args: object[] = [];
    const { session, cookie, query, params } = c;
    const argumentsMetadataArr: ArgumentsMetadata[] = [];
    for (const arg of r.args) {
      let object: any;
      switch (arg.type) {
        case ArgumentsTypes.BODY:
          object = arg.field ? c.request.body?.[arg.field as string] : c.request.body;
          break;
        case ArgumentsTypes.COOKIE:
          object = cookie;
          break;
        case ArgumentsTypes.PARAMS:
          object = arg.field ? params[arg.field as string] : params;
          break;
        case ArgumentsTypes.QUERY:
          object = arg.field ? query[arg.field as string] : query;
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
          const file: FileInfo = {
            ...c.file,
          };
          object = file;
          break;
        case ArgumentsTypes.FILES:
          object = undefined; // todo
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
