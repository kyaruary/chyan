import { Injectable } from "../core/decorators/Injectable";
import { fetchCustomerMetadata, fetchInjectableMetadata } from "./helper";
import { InjectableAttachMetadataCallback } from "./internal/Injectable";

const prefixSymbol = Symbol("prefix");
const suffixSymbol = Symbol("suffix");
const middlewareSymbol = Symbol("middleware");

export function Controller() {
  return Injectable((target) => {
    return {
      onIns: (instance) => {
        fetchInjectableMetadata(instance);
        fetchCustomerMetadata(prefixSymbol, instance);
        console.log(instance);
      },
      metadata: {
        [prefixSymbol]: "",
      },
    };
  });
}

export function createRouterMethod() {}
