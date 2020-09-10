import { BootstrapApplication } from "../lib";
import { EnvConfig } from "../lib/decorators/custom/InjectEnvConfig";
export declare class Application extends BootstrapApplication {
    private config;
    constructor(config: EnvConfig);
    main(): void;
}
