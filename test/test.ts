import { Habe, Controller, Get, Service, Post, Body, IFilter, ILogger, Context, NextFc, Next, IInterceptor, File, Ctx, FileInfo, Upload } from "../lib";
import { promises as fs } from "fs";
import { resolve } from "path";

@Controller()
export class Hello {
  @Get()
  async get(@NextFc() next: Next) {
    return "interceptor";
  }
  @Post()
  post(@Upload("avatar", {}) avatar: FileInfo, @Ctx() ctx: Context) {}
}

export class HttpExceptionFilter implements IFilter {
  catch(error: any, ctx: Context) {
    ctx.body = {
      code: -1,
      msg: error,
    };
  }
}

export class Logger implements ILogger {
  private queue: string[] = [];
  async log(ctx: Context) {
    if (ctx.isStatic) {
      return;
    }
    const time = new Date();
    const ftime = `*** [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}/${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:${time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()}]`;
    const msg = `${ftime}, ${ctx.method}, ${ctx.url}, ${ctx.ip}, ${JSON.stringify(ctx.request.body)}, ${JSON.stringify(ctx.response.body)}`;
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

export class MyInterceptor implements IInterceptor {
  apply(c: Context, data: any) {
    c.body = {
      data,
      code: 0,
      msg: "success",
    };
  }
}

const app = Habe.createApplication({});

app.useGlobalExceptionFilter(HttpExceptionFilter);

app.useLogger(Logger);

app.useGlobalInterceptor(MyInterceptor);

app.useStatic("./public");

app.run();
