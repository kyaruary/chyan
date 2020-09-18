import { Constructor } from "../..";
import { idSymbol, handleInsSymbol } from "../../constant/symbol";
import { uuid } from "../../vendors";
import { _metadataStorage } from "../metadata-storage/metadata";

const metadataGC: Function[] = [];
//v2

export function Injectable(callback?: InjectableMetadataFactory) {
  return (target: Constructor) => {
    if (!Reflect.getMetadata(idSymbol, target.prototype)) {
      const id = uuid.v4();
      attachMetadata(idSymbol, id, target.prototype);
      _metadataStorage.set(id, target);
    }
    if (callback) {
      const meta = callback(target);
      if (meta.metadata) attachMetadataRecord(meta.metadata, target.prototype);
      if (meta.onIns) attachMetadata(handleInsSymbol, meta.onIns, target);
    }
  };
}

export function attachMetadataRecord(metadata: Record<symbol, any>, target: object) {
  for (const key in metadata) {
    attachMetadata(key, metadata[key], target);
  }
}

function attachMetadata(key: Symbol | string, value: any, target: object) {
  if (Reflect.hasMetadata(key, target)) console.warn(`${key} existed! it would cover with value ${value}`);
  Reflect.defineMetadata(key, value, target);
  metadataGC.push(() => Reflect.deleteMetadata(key, target));
}

export type MetadataRecord = Map<Symbol, string>;

export type InjectableMetadataFactory = (target: Constructor) => Partial<InjectableMetadata>;

export interface InjectableMetadata {
  onIns(instance: object): void;
  metadata: Record<symbol, any>;
}
