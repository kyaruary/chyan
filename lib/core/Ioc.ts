import { trace } from "console";
import { ChyanMetaKey } from "../constant/metakey";
import { chyanLogger } from "../utils/chyanlog";
import { Wires } from "./AutoWired";
import { destory, fetchMetadata, metadatas } from "./MetadataStorage";

const pool: Map<string, Injector> = new Map();

export async function resolve() {
  const list = metadatas();

  const MAX_COUNT = list.length; //最大循环次数

  const circleMap = new Map<string, number>();

  // 列表长度不等于0 取出一个node进行操作
  // 如果这个node没有参数 直接实例化
  // 有参数， 对参数进行遍历， 找到所有对实参
  // 如果有找不到的参数，修改这个node的优先级（指定为当前头节点的优先级）推入队列中等待下次查找
  // 并在外部计数， 如果查找的最大值大于整个列表长度，或者头节点为空，代表循环引用，无法实例化，抛出错误给开发者
  loop: while (list.length !== 0) {
    const { node } = list.dequeue()!;
    if (pool.get(node.id)) continue; // 已经存在了

    const args: object[] = [];

    for (const id of node.args_id) {
      if (!pool.has(id)) {
        // 设置计数器
        if (!circleMap.has(node.id)) circleMap.set(node.id, 0);

        const nowCount = circleMap.get(node.id)!;

        //查看计数器是不是已经到了最大值
        if (nowCount >= MAX_COUNT) {
          // todo 尝试使用属性注入这个属性
          chyanLogger.fatal("无法实例全部对象，请查看是否存在循环依赖，如果存在，请使用属性注入！");
          process.exit();
        }

        circleMap.set(node.id, nowCount + 1);

        // 推入列表，等待下次实例化
        const nextPriority = list.head().priority;

        list.enqueue(node, nextPriority);

        continue loop;
      } else {
        args.push(pool.get(id)!.instance);
      }
    }

    const prepareHandler = fetchMetadata<Function>(ChyanMetaKey.prepare, node.target);

    const packingHandler = fetchMetadata<Function>(ChyanMetaKey.packing, node.target);

    const doneHandler = fetchMetadata<Function>(ChyanMetaKey.done, node.target);

    const handleBeforeIns = fetchMetadata<Function>(ChyanMetaKey.beforeIns, node.target);

    if (handleBeforeIns !== null) await handleBeforeIns(node.target, args);

    const handleOnIns = fetchMetadata<Function>(ChyanMetaKey.onIns, node.target);

    let changedObj: object | null = null;

    if (handleOnIns !== null) changedObj = await handleOnIns(node.target, args);

    const o = changedObj ?? Reflect.construct(node.target, args);

    const handleAfterIns = fetchMetadata<Function>(ChyanMetaKey.afterIns, node.target);

    if (handleAfterIns !== null) await handleAfterIns(o);

    const wires = fetchMetadata<Wires[]>(ChyanMetaKey.wires, node.target) ?? [];

    const notPushPool = fetchMetadata<boolean>(ChyanMetaKey.noninvasive, node.target);

    notPushPool || pool.set(node.id, { id: node.id, instance: o, wires });
  }

  for (const [id, injector] of pool) {
    for (const wire of injector.wires) {
      const id = fetchMetadata<string>(ChyanMetaKey.id, wire.type);
      if (id) {
        injector.instance[wire.key] = pool.get(id)?.instance;
      } else {
        chyanLogger.fatal(`${injector.instance.constructor}的属性注入${wire.type.name}不存在！`);
        process.exit();
      }
    }
  }
}

export function fetchInjector<T>(id: string): T | null {
  return ((pool.get(id)?.instance as unknown) as T) || null;
}

interface Injector {
  id: string;
  instance: object;
  wires: Wires[];
}
