import "reflect-metadata";
@t
class Test {
  constructor(private name: string) {}
}

function t(target: Function) {
  const args = Reflect.getMetadata("design:paramtypes", Test);
  console.log(args);
  console.log("===");
}
