import { Constructor, ControllerDescriptor } from "../@types/types";
import { MetaDataStorage } from "../core/metadata";
import "reflect-metadata";
import * as Uuid from "uuid";

export function Controller(prefix?: string) {
  return function ControllerDecorator(target: Constructor) {
    const params = (Reflect.getMetadata("design:paramtypes", target) as Constructor[]) ?? [];
    console.log("controller");
    const args = params.map((param) => {
      param.prototype.id = param.prototype.id ?? Uuid.v4();
      return param.prototype.id;
    });
    const cd: ControllerDescriptor = {
      target: target.prototype.id ?? Uuid.v4(),
      proto: target,
      prefix: prefix ?? "",
      args,
    };
    MetaDataStorage.addControllerDescriptor(cd);
  };
}
