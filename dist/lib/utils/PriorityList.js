"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityList = void 0;
class PriorityList {
    constructor() {
        this.priorityList = [];
    }
    dequeue() {
        return this.priorityList.shift().node;
    }
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
