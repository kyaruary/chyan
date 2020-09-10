"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityList = void 0;
class PriorityList {
    constructor() {
        this.priorityList = [];
    }
    dequeue() {
        var _a;
        return (_a = this.priorityList.shift()) !== null && _a !== void 0 ? _a : null;
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
    head() {
        var _a;
        return (_a = this.priorityList[0]) !== null && _a !== void 0 ? _a : null;
    }
    where(callback) {
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
        while (this.priorityList.length !== 0)
            yield this.dequeue();
    }
}
exports.PriorityList = PriorityList;
