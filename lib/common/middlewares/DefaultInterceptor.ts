import { Injectable } from "@chyan/ioc";
import { ChyanContext, ChyanExceptionFilter, ChyanInterceptor } from "../../types";

@Injectable()
export class DefaultInterceptor implements ChyanInterceptor {
  intercept(body: any, c: ChyanContext) {
    c.body = body;
  }
  transform() {}
}
