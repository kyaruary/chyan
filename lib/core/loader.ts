import path from "path";
import { promises as fs } from "fs";

const promises: Promise<void>[] = [];

export const loader = {
  async load(dirname?: string, fileReg: RegExp = /.*/) {
    if (typeof dirname === "string") injectViaAbsPath(dirname, fileReg);
  },
};

async function RecursiveImport(dir: string, fileReg: RegExp) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.resolve(dir, file);
    if ((await fs.stat(filePath)).isDirectory()) {
      await RecursiveImport(filePath, fileReg);
    } else {
      await DynamicImport(filePath, fileReg);
    }
  }
}

async function DynamicImport(file: string, fileReg: RegExp) {
  const s = file.split(".");
  const extension = s[s.length - 1];
  const isESFile = extension === "ts" || extension === "tsx" || extension === "js" || extension === "jsx";
  if (!isESFile) return;
  const filename = file.replace(/\.[tj]s[x]{0,1}$/, "");
  if (fileReg.test(filename)) promises.push(import(`${file}`));
}

async function injectViaAbsPath(includeAbsPath: string, fileReg: RegExp) {
  if (isAbsPath(includeAbsPath)) {
    if ((await fs.stat(includeAbsPath)).isFile()) {
      await DynamicImport(includeAbsPath, fileReg);
    } else {
      await RecursiveImport(includeAbsPath, fileReg);
    }
  } else {
    throw includeAbsPath + " is not absolute path";
  }
  await Promise.all(promises);
}

function isAbsPath(path: string) {
  const unixReg = /^\//;
  const winReg = /^[a-zA-z]:/;
  return unixReg.test(path) || winReg.test(path);
}
