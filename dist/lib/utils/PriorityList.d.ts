export declare class PriorityList<T> {
    private priorityList;
    dequeue(): PriorityNode<T> | null;
    enqueue(node: T, priority?: number): void;
    head(): PriorityNode<T>;
    where(callback: HighFunction<T>): PriorityNode<T> | null;
    get length(): number;
    [Symbol.iterator](): Generator<PriorityNode<T> | null, void, unknown>;
}
export declare type PriorityNode<T> = {
    priority: number;
    node: T;
};
export declare type HighFunction<T> = (value: PriorityNode<T>) => boolean;
