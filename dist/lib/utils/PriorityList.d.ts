export declare class PriorityList<T> {
    private priorityList;
    dequeue(): T;
    /**
     * 推入列表
     * @param node
     * @param priority
     */
    enqueue(node: T, priority?: number): void;
    /**
     *
     * 查找指定元素
     * @param callback
     */
    where(callback: HighFunction<T>): PriorityNode<T> | null;
    [Symbol.iterator](): Generator<T, void, unknown>;
}
export declare type PriorityNode<T> = {
    priority: number;
    node: T;
};
export declare type HighFunction<T> = (value: PriorityNode<T>) => boolean;
