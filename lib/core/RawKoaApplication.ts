import { Injectable } from "@chyan/ioc";
import KoaApplication from "koa";

@Injectable()
export class RawKoaApplication extends KoaApplication {}
