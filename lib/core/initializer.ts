import { getInjector, resolve } from "./Ioc/Ioc";
import { Poyomon } from "./poyo";
import { InjectorMetadata } from "../types/types";
import { loader } from "./loader";
import { metadataStorage } from "./metadata-storage";
import { BootstrapApplication } from "./BootstrapApplication";

/**
 * 生成生命周期、取出app实例
 */
export async function initializer() {
  let poyo = new Poyomon();

  let onlyOneLifeCircle = true;

  let onlyOneApplicatin = true;

  let bootstrapApplicationMetadata: InjectorMetadata | null = null;

  const metadatas = metadataStorage.getMetadata();

  for (const [id, metadata] of metadatas.injectorMetadataMap) {
    if (!!metadata.meta?.isLifeCircle) {
      if (onlyOneLifeCircle) (poyo = <Poyomon>new metadata.target()), (onlyOneLifeCircle = false), metadatas.injectorMetadataMap.delete(id);
    }
    if (!!metadata.meta?.isApplication) {
      if (onlyOneApplicatin) (bootstrapApplicationMetadata = metadata), (onlyOneApplicatin = false);
    }
  }

  await resolve(poyo);

  if (bootstrapApplicationMetadata !== null) {
    const { id } = bootstrapApplicationMetadata!;

    const app = getInjector(id)?.instance;

    if (app instanceof BootstrapApplication) {
      const controllers = (<string[]>[]).concat(app.scanner);
      if (controllers.length !== 0) {
        await loader.load(controllers);
        await resolve(poyo);
      }
      app.start();
      metadataStorage.destory();
    }
  }
}
