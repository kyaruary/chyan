import { Constructor, InjectorDescriptor, InjectorType } from "../@types/types";
import "reflect-metadata";
import { MetaDataStorage } from "../core/metadata";
import * as Uuid from "uuid";
export function Service() {
  return function ServiceDecorator(target: Constructor) {
    const params = (Reflect.getMetadata("design:paramtypes", target) as Constructor[]) || [];
    const args = params.map((param) => {
      param.prototype.id = param.prototype.id || Uuid.v4();
      return param.prototype.id;
    });
    target.prototype.id = target.prototype.id || Uuid.v4();
    const sd: InjectorDescriptor = {
      target: target.prototype.id,
      proto: target,
      priority: params.length,
      args,
      type: InjectorType.Service,
    };
    MetaDataStorage.addServiceDescriptor(sd);
  };
}
