import { ChyanMetaKey } from "../constant/symbol";
import { fetchMetadata, metadatas } from "./metadata-storage";

const pool: Map<string, object> = new Map();

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
          throw "无法实例全部对象，请查看是否存在循环依赖，如果存在，请使用属性注入！";
        }

        circleMap.set(node.id, nowCount + 1);

        // 推入列表，等待下次实例化
        const nextPriority = list.head().priority;

        list.enqueue(node, nextPriority);

        continue loop;
      } else {
        args.push(pool.get(id)!);
      }
    }

    const handleBeforeIns = fetchMetadata<Function>(ChyanMetaKey.beforeIns, node.target);

    const changedObj = handleBeforeIns === null ? null : handleBeforeIns(node.target, args);

    const o = changedObj ?? Reflect.construct(node.target, args);

    const handleAfterIns = fetchMetadata<Function>(ChyanMetaKey.afterIns, node.target);

    handleAfterIns !== null && handleAfterIns(o);

    pool.set(node.id, { id: node.id, instance: o });
  }
}
