"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityList = void 0;
// 根据优先级推入队列
class PriorityList {
    constructor() {
        this.priorityList = [];
    }
    //  出队
    dequeue() {
        return this.priorityList.shift().node;
    }
    /**
     * 推入列表
     * @param node
     * @param priority
     */
    enqueue(node, priority = 0) {
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
     *
     * 查找指定元素
     * @param callback
     */
    where(callback) {
        for (const node of this.priorityList) {
            if (callback(node)) {
                return node;
            }
        }
        return null;
    }
    *[Symbol.iterator]() {
        while (this.priorityList.length !== 0)
            yield this.dequeue();
    }
}
exports.PriorityList = PriorityList;
