import { Constructor } from "../../types/types";
import { metadataStorage } from "../../core/metadata-storage";
import { Helper } from "../helper";

/**
 * 依赖注入的类装饰器
 * DI injector
 */
export function Injectable(attachMetadata?: InjectableAttachMetadataCallback, level: InjectLevel = InjectLevel.C) {
  return (target: Constructor): any => {
    const id = Helper.injectUniqueIendentification(target);
    if (!metadataStorage.hasInjectorMetadata(id)) {
      const args = Helper.getParamsTypesMetaDataidentitfication(target);
      metadataStorage.collectInjectableMetadata(id, target, args, level);
    }
    metadataStorage.attachInjectorMetadata(id, attachMetadata?.(target));
  };
}

export type InjectableAttachMetadataCallback = (target: Constructor) => any;

export enum InjectLevel {
  H,
  D,
  C,
}
