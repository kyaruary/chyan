import path from "path";
import { Path } from "../@types/types";
import { promises as fs } from "fs";
const promises: Promise<void>[] = [];

export class Utils {
  static async atuoInject(include?: Path[]) {
    const include_path = include ?? ["/"];
    try {
      for (const relative_path of include_path) {
        const abs_path = path.resolve(__dirname, relative_path);
        if ((await fs.stat(abs_path)).isFile()) {
          await this.DynamicImport(abs_path);
        } else {
          await this.RecursiveImport(abs_path);
        }
      }
      await Promise.all(promises);
    } catch (e) {
      console.log(e, "dynamic import failed");
    }
  }

  /**
   * *\/contoller
   * ** contoller
   * contollers/ **
   * *Controller
   * @param controller
   */
  private static parseControllersPath(all: string) {
    const controllers = all.split(",");
    const paths: string[] = [];
    for (const controller of controllers) {
      paths.push(this.handleControllerPath(controller));
    }
    return paths;
  }

  private static handleControllerPath(controller: string): string {
    controller = controller.trim();
    return controller;
  }

  static async RecursiveImport(dir: Path) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if ((await fs.stat(file)).isDirectory()) {
        await this.RecursiveImport(path.resolve(dir, file));
      } else {
        await this.DynamicImport(path.resolve(dir, file));
      }
    }
  }

  static async DynamicImport(file: Path) {
    const s = file.split(".");
    const extension = s[s.length - 1];
    const isTsFile = extension === "ts" || extension === "tsx";
    if (!isTsFile) {
      return;
    }
    promises.push(import(`${file}`));
  }
}
