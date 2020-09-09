export declare class PriorityList<T> {
    private priorityList;
    dequeue(): T;
    enqueue(node: T, priority?: number): void;
    where(callback: HighFunction<T>): PriorityNode<T> | null;
    [Symbol.iterator](): Generator<T, void, unknown>;
}
export declare type PriorityNode<T> = {
    priority: number;
    node: T;
};
export declare type HighFunction<T> = (value: PriorityNode<T>) => boolean;
