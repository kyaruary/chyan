import { IInterceptor } from "../interface";
import { Context } from "../core/Context";

export class HabeInterceptor implements IInterceptor {
  apply(c: Context, data: any) {
    c.status = 200;
    c.body = data;
  }
}
