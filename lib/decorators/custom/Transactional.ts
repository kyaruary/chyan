import { Constructor } from "../../@types/types";

export function Transactional() {
  return function (target: Object, key: string, descriptor: PropertyDescriptor) {
    /// 要么全部完成，要么全部不完成（回滚）
  };
}
