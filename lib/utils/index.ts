import path from "path";
import { Constructor } from "../@types/types";
import { promises as fs } from "fs";

const promises: Promise<void>[] = [];

export class Utils {
  static async atuoInject(include: string[]) {
    const include_path = include;
    try {
      this.injectViaAbsPath(include_path);
    } catch (e) {
      console.log(e, "dynamic import failed");
    }
  }

  static async RecursiveImport(dir: string) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.resolve(dir, file);
      if ((await fs.stat(filePath)).isDirectory()) {
        await this.RecursiveImport(filePath);
      } else {
        await this.DynamicImport(filePath);
      }
    }
  }

  static async DynamicImport(file: string) {
    const s = file.split(".");
    const extension = s[s.length - 1];
    const isTsFile = extension === "ts" || extension === "tsx";
    if (!isTsFile) {
      return;
    }
    promises.push(import(`${file}`));
  }

  static async injectViaAbsPath(includeAbsPath: string[]) {
    for (const path of includeAbsPath) {
      if (this.isAbsPath(path)) {
        if ((await fs.stat(path)).isFile()) {
          await this.DynamicImport(path);
        } else {
          await this.RecursiveImport(path);
        }
      } else {
        throw path + "is not absolute path";
      }
    }
    await Promise.all(promises);
  }

  private static isAbsPath(path: string) {
    const unixReg = /^\//;
    const winReg = /^[a-zA-z]:/;
    return unixReg.test(path) || winReg.test(path);
  }
}
