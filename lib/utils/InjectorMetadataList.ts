import { InjectorMetadataMap } from "../core/metadata-storage";
import { InjectLevel } from "../decorators";
import { InjectorMetadata } from "../interface";
import { PriorityList } from "./PriorityList";

const h: PriorityList<InjectorMetadata> = new PriorityList();

const d: PriorityList<InjectorMetadata> = new PriorityList();

const c: PriorityList<InjectorMetadata> = new PriorityList();

const list: PriorityList<InjectorMetadata> = new PriorityList();

export function transferMap2List(im: InjectorMetadataMap) {
  for (const [id, metadata] of im) {
    const level = metadata.level;
    const priority = metadata.args.length;
    if (level === InjectLevel.H) {
      h.enqueue(metadata, priority);
    } else if (level === InjectLevel.D) {
      d.enqueue(metadata, priority);
    } else if (level === InjectLevel.C) {
      c.enqueue(metadata, priority);
    }
    list.enqueue(metadata, priority);
  }
}

export function getInjectorMetadataList() {
  return { h, d, c, list };
}
