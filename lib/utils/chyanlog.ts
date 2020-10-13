import * as log4js from "log4js";

export const chyanLogger = log4js.getLogger("[ chyan.internal ]");

export const utLogger = log4js.getLogger("[ chyan.unit.test ]");

chyanLogger.level = process.env.NODE_ENV === "production" ? "fatal" : "trace";

const fatal = chyanLogger.fatal.bind(chyanLogger);

chyanLogger.fatal = function (...args: any[]) {
  fatal("", ...args);
};
