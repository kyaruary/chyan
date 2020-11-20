import log4js, { Configuration, configure, Appender } from "log4js";
import { Injectable } from "accioo";

@Injectable()
export class ChyanLogger {
  protected category = "[ chyan.co ]";
  protected logger = log4js.getLogger(this.category);

  protected config: Configuration = {
    appenders: {},
    categories: {},
  };

  constructor() {
    // configure(this.config);
    this.logger.level = "trace";
  }

  trace(message: string, ...args: any[]) {
    this.logger.trace(message, ...args);
  }

  stack(message?: string, ...args: any[]) {
    console.trace(message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.logger.info(message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.logger.error(message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args);
  }

  fatal(message: string, ...args: any[]) {
    this.logger.fatal(message, ...args);
  }

  debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args);
  }
}
