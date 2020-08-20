import { Constructor } from "../@types/types";

export function Middleware() {
  return (target: Constructor) => {};
}
