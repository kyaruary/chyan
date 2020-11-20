import { Injectable } from "@chyan/ioc";
import { HttpException } from "../../constant/Exception";
import { ChyanContext, ChyanExceptionFilter } from "../../types";

@Injectable()
export class DefaultExceptionFilter implements ChyanExceptionFilter {
  catch(e: Error, c: ChyanContext) {
    if (e instanceof HttpException) {
      c.status = e.status;
      c.body = e.msg;
    } else {
      c.status = 500;
      c.body = "Server Internal Error";
    }
  }
}
