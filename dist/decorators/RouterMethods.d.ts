import { Path } from "../@types/types";
export declare function Get(path?: Path): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function Post(path?: Path): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function Delete(path?: Path): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function Trace(path?: Path): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function Put(path?: Path): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function Options(path?: Path): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function Head(path?: Path): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function Connect(path?: Path): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
