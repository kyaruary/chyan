import { Habe, Controller, Get, Service, Post, Body, Filter, Logger, Context, NextFc, Next, Interceptor, Ctx } from "../lib";
import { promises as fs } from "fs";
import { resolve } from "path";
import multer from "@koa/multer";

const multerOption: multer.Options = {};

@Controller()
export class Hello {
  @Get()
  async get(@NextFc() next: Next) {
    return "interceptor";
  }
}

export class HttpExceptionFilter implements Filter {
  catch(error: any, ctx: Context) {
    ctx.body = {
      code: -1,
      msg: error,
    };
  }
}

export class MyLogger implements Logger {
  private queue: string[] = [];
  async log(ctx: Context) {
    if (ctx.isStatic) {
      return;
    }
    const time = new Date();
    const ftime = `*** [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}/${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:${time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()}]`;
    const msg = `${ftime}, ${ctx.method}, 访问地址: ${ctx.url}, ip: ${ctx.ip}, 请求参数: ${JSON.stringify(ctx.request.body)}, 返回数据: ${JSON.stringify(ctx.response.body)}\n`;
    console.log(msg);
    this.queue.push(msg);
    // setInterval(() => {
    //   this.write2File();
    // }, 1000 * 6);
  }

  async write2File() {
    if (this.queue.length === 0) {
      return;
    }
    const logs = this.queue.join("\n");
    this.queue = [];
    await fs.writeFile(resolve(__dirname, "../log/record.log"), logs, { flag: "a+" });
    console.log("write log success");
  }
}

export class MyInterceptor implements Interceptor {
  apply(c: Context, data: any) {
    c.body = {
      data,
      code: 0,
      msg: "success",
    };
  }
}

const app = Habe.createApplication({
  controllers: [],
});

app.useGlobalExceptionFilter(HttpExceptionFilter);

app.useLogger(MyLogger);

app.useGlobalInterceptor(MyInterceptor);

app.useStatic("./public");

app.run();
