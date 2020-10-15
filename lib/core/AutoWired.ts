import { fetchMetadata, attachMetadata } from "./MetadataStorage";
import { DesignMetaKey } from "../constant/metakey";
import { ChyanMetaKey } from "../constant";

export interface Wires {
  type: any;
  key: string;
}

export function AutoWired() {
  return (target: object, key: string) => {
    const type = fetchMetadata(DesignMetaKey.propertyType, target, key);
    const wries = fetchMetadata<Wires[]>(ChyanMetaKey.wires, target) ?? [];
    attachMetadata(ChyanMetaKey.wires, wries.concat({ key, type }), target);
  };
}
