"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const promises = [];
class Utils {
    static async atuoInject(include) {
        const include_path = include;
        try {
            for (const relative_path of include_path) {
                const abs_path = path_1.default.resolve(process.cwd(), relative_path);
                if ((await fs_1.promises.stat(abs_path)).isFile()) {
                    await this.DynamicImport(abs_path);
                }
                else {
                    await this.RecursiveImport(abs_path);
                }
            }
            await Promise.all(promises);
        }
        catch (e) {
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
    static parseControllersPath(all) {
        const controllers = all.split(",");
        const paths = [];
        for (const controller of controllers) {
            paths.push(this.handleControllerPath(controller));
        }
        return paths;
    }
    static handleControllerPath(controller) {
        controller = controller.trim();
        return controller;
    }
    static async RecursiveImport(dir) {
        const files = await fs_1.promises.readdir(dir);
        for (const file of files) {
            const filePath = path_1.default.resolve(dir, file);
            if ((await fs_1.promises.stat(filePath)).isDirectory()) {
                await this.RecursiveImport(filePath);
            }
            else {
                await this.DynamicImport(filePath);
            }
        }
    }
    static async DynamicImport(file) {
        const s = file.split(".");
        const extension = s[s.length - 1];
        const isTsFile = extension === "ts" || extension === "tsx";
        if (!isTsFile) {
            return;
        }
        promises.push(Promise.resolve().then(() => __importStar(require(`${file}`))));
    }
}
exports.Utils = Utils;
