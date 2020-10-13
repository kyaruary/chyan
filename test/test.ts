import { testCollectInjector } from "./collectInjector.test";
import { testIoc } from "./ioc.test";
import { testMetadata } from "./metadata.test";
import { testRouter } from "./router.test";

testMetadata();

testCollectInjector();

testIoc();

testRouter();
