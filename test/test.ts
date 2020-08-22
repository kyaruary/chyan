import { Habe, Controller, Get, Service, Post, Body, IFilter, ILogger } from "../lib";
import { Context } from "koa";
import { promises as fs } from "fs";
import { resolve } from "path";

@Controller()
export class Hello {
  @Get()
  get() {
    throw "error home page";
    return "123";
  }
  @Post()
  post(@Body("phone") body: any) {
    console.log(body);
    return "ok";
  }
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
    const time = new Date();
    const ftime = `*** [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}/${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:${time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()}]`;
    const msg = `${ftime}, ${ctx.method}, ${ctx.url}, ${ctx.ip}, ${JSON.stringify(ctx.request.body)}, ${JSON.stringify(ctx.response.body)}`;
    console.log(msg);
    this.queue.push(msg);
    setInterval(() => {
      this.write2File();
    }, 1000 * 6);
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
const app = Habe.createApplication();

app.useGlobalExceptionFilter(HttpExceptionFilter);

app.useLogger(Logger);

app.run();
