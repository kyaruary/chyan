import { Habe, Controller, Get, Service } from "../lib";
import { Ctx, NextFc, Params, Session } from "../lib/decorators/Arguments";
import { Context, Next } from "koa";
import { resolve } from "path";
import { config } from "dotenv";

const app = Habe.createApplication();

app.run();
