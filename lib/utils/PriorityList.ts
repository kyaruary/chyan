// 根据优先级推入队列
export class PriorityList<T> {
  private priorityList: PriorityNode<T>[] = [];

  //  出队
  dequeue() {
    return this.priorityList.shift() ?? null;
  }

  /**
   * 推入列表
   * @param node
   * @param priority
   */
  enqueue(node: T, priority: number = 0) {
    let flag = false;
    this.priorityList.some((el, index) => {
      if (el.priority > priority) {
        this.priorityList.splice(index, 0, { node, priority });
        return (flag = true);
      }
    });
    !flag && this.priorityList.push({ node, priority });
  }

  /**
   * 获取头节点，但是不弹出
   */
  head() {
    return this.priorityList[0] ?? null;
  }
  /**
   *
   * 查找指定元素
   * @param callback
   */
  where(callback: HighFunction<T>): PriorityNode<T> | null {
    for (const node of this.priorityList) {
      if (callback(node)) {
        return node;
      }
    }
    return null;
  }

  get length() {
    return this.priorityList.length;
  }

  *[Symbol.iterator]() {
    while (this.priorityList.length !== 0) yield this.dequeue();
  }
}

export type PriorityNode<T> = {
  priority: number;
  node: T;
};

export type HighFunction<T> = (value: PriorityNode<T>) => boolean;
