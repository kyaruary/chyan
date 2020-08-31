import { InjectorDescriptor, ControllerDescriptor, ActionDescriptor, ArgumentsDescriptor, EntityDescriptor } from "../@types/types";
import { EnvConfig } from "./EnvConfig";
export declare class MetaDataStorage {
    private static instacne;
    static getMetaDataStroage(): MetaDataStorage;
    static addServiceDescriptor(sd: InjectorDescriptor): void;
    static addControllerDescriptor(cd: ControllerDescriptor): void;
    static addActionDescriptor(rmd: ActionDescriptor): void;
    static addArgumentsDescriptor(ad: ArgumentsDescriptor): void;
    static attachMiddleware2Action(target: string, key: string, middleware: Function): void;
    static addEntityDescriptor(ed: EntityDescriptor): void;
    static addMiddleware(m: InjectorDescriptor): void;
    private serviceDescriptors;
    private controllerDescriptors;
    private actionDescriptors;
    private argumentsDescriptors;
    private entityDescriptors;
    private middlewareMap;
    static readonly envConfig: EnvConfig;
    private serviceInstantiationMap;
    private initializeController;
    injectEnvConfig(): EnvConfig<import("../@types/types").Record>;
    private instantiationServices;
    private instantiationController;
    private initDatabase;
    static resolve(): Promise<void>;
}
