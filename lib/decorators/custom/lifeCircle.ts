import { Injectable, InjectLevel } from "../internal/Injectable";

export function LifeCircle() {
  return Injectable((): LifeCircleMeatadata => ({ isLifeCircle: true }), InjectLevel.H);
}

export type LifeCircleMeatadata = {
  isLifeCircle: boolean;
};
