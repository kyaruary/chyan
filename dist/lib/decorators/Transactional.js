"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactional = void 0;
function Transactional() {
    return function (target, key, descriptor) {
        /// 要么全部完成，要么全部不完成（回滚）
    };
}
exports.Transactional = Transactional;
