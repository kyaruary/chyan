import log4js, { configure, Configuration } from "log4js";

export class ChyanLogger {
  private logger = log4js.getLogger();
  constructor() {
    //   const config: Configuration = {
    //     appenders: {},
    //     categories: {},
    //   };
    //   configure(config);
    this.logger.level = "trace";
  }
  trace(message: string) {
    this.logger.trace("[ Chyan.co ]", message);
  }

  info() {
    this.logger.info("Cheese is Comté.");
  }
  error() {
    this.logger.error("Cheese is too ripe!");
  }
  warn() {
    this.logger.warn("Cheese is quite smelly.");
  }
  fatal() {
    this.logger.fatal("Cheese was breeding ground for listeria.");
  }

  debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args);
  }
}
