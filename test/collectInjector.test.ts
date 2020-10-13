import { strictEqual } from "assert";
import { collectInjector, destory, metadatas } from "../dist/core/MetadataStorage";

export function testCollectInjector() {
  const id = "1234";
  class TestClass {}
  const testString = "injector";
  const testNumber = 100;
  const testObject = {};
  const testSymbol = Symbol("test");
  const testBool = false;
  describe("collect injector", function () {
    beforeEach(function () {
      destory();
    });
    describe("collect injector params should be class", function () {
      it("class will inject", function () {
        strictEqual(true, collectInjector(id, TestClass));
      });
      it("string will not inject", function () {
        strictEqual(false, collectInjector(id, testString as any));
      });
      it("number will not inject", function () {
        strictEqual(false, collectInjector(id, testNumber as any));
      });
      it("object will not inject", function () {
        strictEqual(false, collectInjector(id, testObject as any));
      });
      it("symbol will not inject", function () {
        strictEqual(false, collectInjector(id, testSymbol as any));
      });
      it("bool will not inject", function () {
        strictEqual(false, collectInjector(id, testBool as any));
      });
      it("null will not inject", function () {
        strictEqual(false, collectInjector(id, null as any));
      });
      it("undefined will not inject", function () {
        strictEqual(false, collectInjector(id, undefined as any));
      });
    });

    describe("inject length", function () {
      class Test1 {}
      class Test2 {}
      class Test3 {}
      class Test4 {}
      class Test5 {}

      it("length === 1", function () {
        collectInjector("id1", TestClass);
        strictEqual(1, metadatas().length);
      });

      it("length === 2", function () {
        collectInjector("id1", TestClass);
        collectInjector("id2", Test1);
        strictEqual(2, metadatas().length);
      });
      it("length === 3", function () {
        collectInjector("id1", TestClass);
        collectInjector("id2", Test1);
        collectInjector("id3", Test2);
        strictEqual(3, metadatas().length);
      });

      it("length === 4", function () {
        collectInjector("id1", TestClass);
        collectInjector("id2", Test1);
        collectInjector("id3", Test2);
        collectInjector("id4", Test3);
        strictEqual(4, metadatas().length);
      });

      it("length === 5", function () {
        collectInjector("id1", TestClass);
        collectInjector("id2", Test1);
        collectInjector("id3", Test2);
        collectInjector("id4", Test3);
        collectInjector("id5", Test4);
        strictEqual(5, metadatas().length);
      });
      it("length === 6", function () {
        collectInjector("id1", TestClass);
        collectInjector("id2", Test1);
        collectInjector("id3", Test2);
        collectInjector("id4", Test3);
        collectInjector("id5", Test4);
        collectInjector("id6", Test5);
        strictEqual(6, metadatas().length);
      });
      it("length === 1", function () {
        collectInjector("id1", TestClass);
        collectInjector("id1", Test1);
        collectInjector("id1", Test2);
        collectInjector("id1", Test3);
        collectInjector("id1", Test4);
        collectInjector("id1", Test5);
        strictEqual(1, metadatas().length);
      });
      it("length === 2", function () {
        collectInjector("id1", TestClass);
        collectInjector("id2", Test1);
        collectInjector("id1", Test2);
        collectInjector("id1", Test3);
        collectInjector("id1", Test4);
        collectInjector("id2", Test5);
        strictEqual(2, metadatas().length);
      });
    });
  });
}
