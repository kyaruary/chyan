import { Injectable } from "../internal/Injectable";

export function InjectChyanLogger() {
  return Injectable();
}

@InjectChyanLogger()
export class ChyanLogger {}
