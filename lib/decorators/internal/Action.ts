import { metadataStorage } from "../../core/metadata-storage";
import { Helper } from "../helper";
import { MetadataRecord } from "./Injectable";

type ActionCallback = (target: Object, key: string, des: PropertyDescriptor) => MetadataRecord;

export function Action(callback?: ActionCallback) {
  return function ActionDescriptorDecorator(target: Object, key: string, descriptor: PropertyDescriptor) {
    const host = Helper.injectUniqueIendentification(target);
    const id = host + key;
    if (!metadataStorage.hasActionMetadata(host, id)) {
      const argsType = Helper.getActionParamsTypes(target, key);
      metadataStorage.collectActionMetadata(host, id, key, argsType);
    }
    metadataStorage.attachActionMetadata(host, id, callback?.(target, key, descriptor));
  };
}

export function Actionv2() {}
