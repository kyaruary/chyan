import { Constructor, InjectorMetadata, Record } from "../../interface";
import { getInjectorMetadataList, transferMap2List } from "../../utils/InjectorMetadataList";
import { PriorityNode } from "../../utils/PriorityList";
import { metadataStorage } from "../metadata-storage";
import { Poyomon } from "../poyo";

const pool: injectorMap = new Map();

function constructViaInjectorMap(id: string, target: Constructor, args: string[], injectorMap: injectorMap): object {
  const instanceArgs = args.map((arg) => injectorMap.get(arg)?.instance);
  return Reflect.construct(target, instanceArgs);
}

export async function resolve(poyo?: Poyomon) {
  const metadatas = metadataStorage.getMetadata();

  transferMap2List(metadatas.injectorMetadataMap);

  const { list } = getInjectorMetadataList();

  const MAX_COUNT = list.length; //最大循环次数

  const circleMap = new Map<string, number>();

  // 列表长度不等于0 取出一个node进行操作
  // 如果这个node没有参数 直接实例化
  // 有参数， 对参数进行遍历， 找到所有对实参
  // 如果有找不到的参数，修改这个node的优先级（指定为当前头节点的优先级）推入队列中等待下次查找
  // 并在外部技术， 如果查找的最大值大于整个列表长度，或者头节点为空，代表循环引用，无法实例化，抛出错误给开发者
  while (list.length !== 0) {
    const { node } = list.dequeue()!;
    if (pool.get(node.id)) continue; // 已经存在了

    const args: object[] = [];

    for (const id of node.args) {
      if (pool.get(id) === undefined) {
        // 根本没有注入这个参数
        if (!metadatas.injectorMetadataMap.get(id)) throw `实例${node.target.name}找不到参数, 请给需要注入的参数加入装饰器`;

        // 设置计数器
        if (!circleMap.has(node.id)) circleMap.set(node.id, 0);

        const nowCount = circleMap.get(node.id)!;

        //查看计数器是不是已经到了最大值
        if (nowCount >= MAX_COUNT) {
          throw "无法实例全部对象，请查看是否存在循环依赖，如果存在，请使用属性注入！";
        }

        circleMap.set(node.id, nowCount + 1);

        // 推入列表，等待下次实例化
        const nextPriority = list.head().priority;

        list.enqueue(node, nextPriority);
        continue;
      }
      args.push(pool.get(id)!.instance);
    }

    // 顺利走下去
    const o = Reflect.construct(node.target, args);
    const no = await poyo?.bubbles(node.id, o, metadatas);
    pool.set(node.id, { id: node.id, instance: !!no ? no : o });
  }
}

export function getInjector(id: string) {
  return pool.get(id);
}

export interface Injector extends Record {
  id: string;
  instance: object;
}

type injectorMap = Map<string, Injector>;
