require("reflect-metadata");

class A {}

Reflect.defineMetadata("id", "123", A.prototype);
console.log(Reflect.getMetadata("id", A));
console.log(Reflect.getMetadata("id", A.prototype));
console.log(Reflect.getMetadata("id", new A()));
