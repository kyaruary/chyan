import { Path } from "../@types/types";
export declare class Utils {
    static atuoInject(include?: Path[]): Promise<void>;
    private static parseController;
    static RecursiveImport(dir: Path): Promise<void>;
    static DynamicImport(file: Path): Promise<void>;
}
