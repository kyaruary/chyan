import path from "path";
import { Constructor } from "../types/types";
import { promises as fs } from "fs";

const promises: Promise<void>[] = [];

export const loader = {
  async load(paths: string[]) {
    await injectViaAbsPath(paths);
  },
};

async function RecursiveImport(dir: string) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.resolve(dir, file);
    if ((await fs.stat(filePath)).isDirectory()) {
      await RecursiveImport(filePath);
    } else {
      await DynamicImport(filePath);
    }
  }
}

async function DynamicImport(file: string) {
  const s = file.split(".");
  const extension = s[s.length - 1];
  const isTsFile = extension === "ts" || extension === "tsx";
  if (!isTsFile) return;

  promises.push(import(`${file}`));
}

async function injectViaAbsPath(includeAbsPath: string[]) {
  for (const path of includeAbsPath) {
    if (isAbsPath(path)) {
      if ((await fs.stat(path)).isFile()) {
        await DynamicImport(path);
      } else {
        await RecursiveImport(path);
      }
    } else {
      throw path + " is not absolute path";
    }
  }
  await Promise.all(promises);
}

function isAbsPath(path: string) {
  const unixReg = /^\//;
  const winReg = /^[a-zA-z]:/;
  return unixReg.test(path) || winReg.test(path);
}
