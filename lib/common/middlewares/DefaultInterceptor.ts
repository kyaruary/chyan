import { Injectable } from "accioo";
import { ChyanContext, ChyanExceptionFilter, ChyanInterceptor } from "../../types";

@Injectable()
export class DefaultInterceptor implements ChyanInterceptor {
  intercept(body: any, c: ChyanContext) {
    c.body = body;
  }
  transform() {}
}
