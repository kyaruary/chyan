import { metadataStorage } from "../../core/metadata-storage";
import { Constructor } from "../../interface";
import { Helper } from "../helper";

export type ArgumentAttachMetadataCallback = (target: Constructor, key: string, index: number) => any;

export function Argument(callback: ArgumentAttachMetadataCallback) {
  return (traget: Constructor, key: string, index: number) => {
    const host = Helper.injectUniqueIendentification(traget) + key;
    const id = host + index;
    if (!metadataStorage.hasArgumentMetadata(host, id)) {
      metadataStorage.collectArgumentMetadata(host, id, { host, key, position: index });
    }
    metadataStorage.attachArgumentMetadata(host, id, callback(traget, key, index));
  };
}

export function Arugment2() {}
