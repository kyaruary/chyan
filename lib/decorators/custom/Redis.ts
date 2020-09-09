import { Constructor } from "../../interface";

export function Redis() {
  return (target: Constructor) => {};
}
