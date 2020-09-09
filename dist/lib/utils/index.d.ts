export declare class Utils {
    static atuoInject(include: string[]): Promise<void>;
    static RecursiveImport(dir: string): Promise<void>;
    static DynamicImport(file: string): Promise<void>;
    static injectViaAbsPath(includeAbsPath: string[]): Promise<void>;
    private static isAbsPath;
}
