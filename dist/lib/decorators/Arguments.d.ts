export declare function Body(field?: string): (target: Object, key: string, index: number) => void;
export declare function Query(field?: string): (target: Object, key: string, index: number) => void;
export declare function Params(field?: string): (target: Object, key: string, index: number) => void;
export declare function NextFc(): (target: Object, key: string, index: number) => void;
export declare function Res(): (target: Object, key: string, index: number) => void;
export declare function Req(): (target: Object, key: string, index: number) => void;
export declare function Cookie(): (target: Object, key: string, index: number) => void;
export declare function Session(): (target: Object, key: string, index: number) => void;
export declare function Ctx(): (target: Object, key: string, index: number) => void;
export declare function Upload(name: string): (target: Object, key: string, index: number) => void;
