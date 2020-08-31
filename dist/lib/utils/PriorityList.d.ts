export declare class PriorityList<T> {
    private priorityList;
    dequeue(): T;
    enqueue(node: T, priority?: number): void;
    delay(): void;
    [Symbol.iterator](): Generator<T, void, unknown>;
}
export declare type PriorityNode<T> = {
    priority: number;
    node: T;
};
