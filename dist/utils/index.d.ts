import { Path } from "../@types/types";
export declare class Utils {
    static atuoInject(include?: Path[]): Promise<void>;
    /**
     * *\/contoller
     * ** contoller
     * contollers/ **
     * *Controller
     * @param controller
     */
    private static parseControllersPath;
    private static handleControllerPath;
    static RecursiveImport(dir: Path): Promise<void>;
    static DynamicImport(file: Path): Promise<void>;
}
