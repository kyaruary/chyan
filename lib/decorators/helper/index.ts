import { Constructor, Context, Next } from "../..";
import "reflect-metadata";
import { uuid } from "../../vendors";
import { Argument } from "../internal/Argument";
import { idSymbol } from "../../constant/symbol";

export class Helper {
  static injectUniqueIendentification(target: Object | Constructor): string {
    if (typeof target === "function") {
      target.prototype.id ??= uuid.v4();
      return target.prototype.id;
    } else if (typeof target === "object") {
      target.constructor.prototype.id ??= uuid.v4();
      return target.constructor.prototype.id;
    }
    throw "Inject Unique Iendentification fail";
  }

  static getParamsTypesMetaDataidentitfication(target: Constructor): string[] {
    const params = (Reflect.getMetadata("design:paramtypes", target) as Constructor[]) || [];
    return params.map((param) => {
      this.injectUniqueIendentification(param);
      return param.prototype.id;
    });
  }

  static getConsParamsTypes(target: Constructor | Object) {
    return (Reflect.getMetadata("design:paramtypes", target) as Constructor[]) ?? [];
  }
  static getActionParamsTypes(target: Object, key: string) {
    return (Reflect.getMetadata("design:paramtypes", target, key) as Constructor[]) ?? [];
  }
}

export type ArgumentsCreatedFunction = (c: Context, next: Next) => any;

export function createArgumentsDecorator(callback: ArgumentsCreatedFunction) {
  const argumentAttachMetadataCallback = () => ({ callback });
  return Argument(argumentAttachMetadataCallback);
}

export function getMetadata() {}

export function fetchCustomerMetadata<T>(key: Symbol, target: object): T {
  return Reflect.getMetadata(key, target) as T;
}

export function fetchInjectableMetadata(target: object) {
  return {
    id: Reflect.getMetadata(idSymbol, target),
    args: (Reflect.getMetadata("design:paramtypes", target) as Constructor[]) ?? [],
  };
}

export function fetchActionMetadata(key: string, target: object) {}
