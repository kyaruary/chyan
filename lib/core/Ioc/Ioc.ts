import { Constructor, InjectorMetadata, Record } from "../../interface";
import { getInjectorMetadataList, transferMap2List } from "../../utils/InjectorMetadataList";
import { PriorityList } from "../../utils/PriorityList";
import { BootstrapApplication } from "../BootstrapApplication";
import { loader } from "../loader";
import { metadataStorage } from "../metadata-storage";
import { Poyomon } from "../poyo";

const pool: injectorMap = new Map();

let poyo: Poyomon = new Poyomon();

function constructViaInjectorMap(id: string, target: Constructor, args: string[], injectorMap: injectorMap): object {
  const instanceArgs = args.map((arg) => injectorMap.get(arg)?.instance);
  return Reflect.construct(target, instanceArgs);
}

export async function resolve() {
  const metadatas = metadataStorage.getMetadata();

  transferMap2List(metadatas.injectorMetadataMap);

  const { list } = getInjectorMetadataList();

  // undo 优先级 / 属性注入
  for (const node of list) {
    if (pool.get(node.id)) return;
    const o = constructViaInjectorMap(node.id, node.target, node.args, pool);
    const no = await poyo.bubbles(node.id, o, metadatas);
    if (typeof no === "object" || typeof no === "function") {
      pool.set(node.id, { id: node.id, instance: no });
    } else {
      pool.set(node.id, { id: node.id, instance: o });
    }
  }
}

/**
 * 生成生命周期、取出app实例
 */
export async function initializer() {
  let onlyOneLifeCircle = true;

  let onlyOneApplicatin = true;

  let bootstrapApplicationMetadata: InjectorMetadata | null = null;

  const metadatas = metadataStorage.getMetadata();

  for (const [id, metadata] of metadatas.injectorMetadataMap) {
    if (!!metadata.meta!.isLifeCircle) {
      if (onlyOneLifeCircle) poyo = <Poyomon>new metadata.target();
      onlyOneLifeCircle = false;
      metadatas.injectorMetadataMap.delete(id);
    }
    if (!!metadata.meta!.isApplication) {
      if (onlyOneApplicatin) bootstrapApplicationMetadata = metadata;
      onlyOneApplicatin = false;
      metadatas.injectorMetadataMap.delete(id);
    }
  }

  await resolve();

  if (bootstrapApplicationMetadata !== null) {
    const { target, args, id } = bootstrapApplicationMetadata!;

    const app = constructViaInjectorMap(id, target, args, pool) as BootstrapApplication;

    if (app instanceof BootstrapApplication) {
      const controllers = (<string[]>[]).concat(app.scanner);
      if (controllers.length !== 0) {
        await loader.load(controllers);
        await resolve();
      }
      app.start();
    }
  }
}

export interface Injector extends Record {
  id: string;
  instance: object;
}

type injectorMap = Map<string, Injector>;
