import { collectInjector, destory, fetchMetadata } from "../dist/core/MetadataStorage";
import { fetchInjector, resolve } from "../dist/core/Ioc";
import { Injectable } from "../dist/core/Injectable";
import { ChyanMetaKey } from "../dist/constant/metakey";
import { strictEqual } from "assert";
import { AutoWired } from "../dist";
export function testIoc() {
  describe("ioc & fetchInjector & Injectable", function () {
    beforeEach(function () {
      destory();
    });
    describe("#resolve", function () {
      it("get Test instance via fetchInjector and #log return test", async function () {
        class Test {
          log() {
            return "test";
          }
        }
        collectInjector("test", Test);
        await resolve();
        const t = fetchInjector<Test>("test");
        strictEqual(true, t instanceof Test);
        strictEqual("test", t?.log());
      });

      describe("single dependcy inject", function () {
        it("get dt, t, dt#log return test, t#log return test", async function () {
          @Injectable()
          class Test {
            log() {
              return "test";
            }
          }
          @Injectable()
          class DoubleTest {
            constructor(private t: Test) {}
            log() {
              return this.t.log();
            }
          }
          await resolve();
          const tid = fetchMetadata<string>(ChyanMetaKey.id, Test);
          const dtid = fetchMetadata<string>(ChyanMetaKey.id, DoubleTest);

          strictEqual("string", typeof tid);
          strictEqual("string", typeof dtid);

          const t = fetchInjector<Test>(tid!);
          const dt = fetchInjector<DoubleTest>(dtid!);
          strictEqual(true, dt instanceof DoubleTest);
          strictEqual(true, t instanceof Test);

          strictEqual("test", dt?.log?.());
          strictEqual("test", t?.log?.());
        });
      });

      describe("multi dependcy inject", function () {
        it("get dt, t, dt#log return test, t#log return test", async function () {
          @Injectable()
          class Test {
            log() {
              return "test";
            }
          }
          @Injectable()
          class DoubleTest {
            constructor(private t: Test) {}
            log() {
              return this.t.log();
            }
          }
          @Injectable()
          class TribleTest {
            constructor(private t: Test, private dt: DoubleTest) {}
            log() {
              return this.dt.log();
            }
            logt() {
              return this.t.log();
            }
          }

          await resolve();
          const tid = fetchMetadata<string>(ChyanMetaKey.id, Test);
          const dtid = fetchMetadata<string>(ChyanMetaKey.id, DoubleTest);
          const ttid = fetchMetadata<string>(ChyanMetaKey.id, TribleTest);

          strictEqual("string", typeof tid);
          strictEqual("string", typeof dtid);
          strictEqual("string", typeof ttid);

          const t = fetchInjector<Test>(tid!);
          const dt = fetchInjector<DoubleTest>(dtid!);
          const tt = fetchInjector<TribleTest>(ttid!);
          strictEqual(true, tt instanceof TribleTest);
          strictEqual(true, dt instanceof DoubleTest);
          strictEqual(true, t instanceof Test);

          strictEqual("test", dt?.log?.());
          strictEqual("test", t?.log?.());
          strictEqual("test", tt?.log?.());
          strictEqual("test", tt?.logt?.());
        });
      });
    });

    describe("auto wired inject", function () {
      it("test#log should return test", async function () {
        @Injectable()
        class AutoWiredClass {
          log() {
            return "test";
          }
        }

        @Injectable()
        class TestClass {
          @AutoWired()
          private awc!: AutoWiredClass;
          log() {
            return this.awc.log();
          }
        }
        await resolve();
        const ttid = fetchMetadata<string>(ChyanMetaKey.id, TestClass);
        const tt = fetchInjector<TestClass>(ttid!);
        strictEqual(true, tt instanceof TestClass);
        strictEqual("test", tt?.log?.());
      });
    });
  });
}
