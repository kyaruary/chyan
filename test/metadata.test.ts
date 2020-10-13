import assert from "assert";
import { attachMetadata, destory, fetchMetadata } from "../dist/core/MetadataStorage";

export function testMetadata() {
  const metakey = {
    id: "test:class-id",
    method: "test:method",
    member: "test:member",
    param: "test:param",
  };

  const metavalue = {
    id: "test-class-id",
    method: "test-method",
    member: "test-member",
  };

  describe("attach metadat & fetch metadata", function () {
    beforeEach(function () {
      destory();
    });

    describe("attach class metadata", function () {
      class C {}
      class TestClass {
        cc!: C;
        sayC() {
          return "cc";
        }
      }
      attachMetadata(metakey.id, metavalue.id, TestClass);
      attachMetadata(metakey.method, metavalue.method, TestClass, "sayC");
      attachMetadata(metakey.member, metavalue.member, TestClass, "cc");

      describe("fetch from class", function () {
        const id = fetchMetadata<string>(metakey.id, TestClass);
        const member = fetchMetadata<string>(metakey.member, TestClass, "cc");
        const method = fetchMetadata<string>(metakey.method, TestClass, "sayC");
        it(`${metakey.id} from class must be ${metavalue.id}`, function () {
          assert.strictEqual(id, metavalue.id);
        });
        it(`${metakey.member} from class must be ${metavalue.member}`, function () {
          assert.strictEqual(member, metavalue.member);
        });
        it(`${metakey.method} from class must be ${metavalue.method}`, function () {
          assert.strictEqual(method, metavalue.method);
        });
      });

      describe("fetch from class instance", function () {
        const t = new TestClass();
        const id = fetchMetadata<string>(metakey.id, t);
        const member = fetchMetadata<string>(metakey.member, t, "cc");
        const method = fetchMetadata<string>(metakey.method, t, "sayC");
        it(`${metakey.id} from class instance must be ${metavalue.id}`, function () {
          assert.strictEqual(id, metavalue.id);
        });
        it(`${metakey.member} from class instance must be ${metavalue.member}`, function () {
          assert.strictEqual(member, metavalue.member);
        });
        it(`${metakey.method} from class instance must be ${metavalue.method}`, function () {
          assert.strictEqual(method, metavalue.method);
        });
      });

      describe("fetch from prototype", function () {
        const id = fetchMetadata<string>(metakey.id, TestClass.prototype);
        const member = fetchMetadata<string>(metakey.member, TestClass.prototype, "cc");
        const method = fetchMetadata<string>(metakey.method, TestClass.prototype, "sayC");
        it(`${metakey.id} from class prototype must be ${metavalue.id}`, function () {
          assert.strictEqual(id, metavalue.id);
        });
        it(`${metakey.member} from class prototype must be ${metavalue.member}`, function () {
          assert.strictEqual(member, metavalue.member);
        });
        it(`${metakey.method} from class prototype must be ${metavalue.method}`, function () {
          assert.strictEqual(method, metavalue.method);
        });
      });
    });

    describe("attach class prototype metadata", function () {
      class C {}
      class TestClass {
        cc!: C;
        sayC() {
          return "cc";
        }
      }
      attachMetadata(metakey.id, metavalue.id, TestClass.prototype);
      attachMetadata(metakey.method, metavalue.method, TestClass.prototype, "sayC");
      attachMetadata(metakey.member, metavalue.member, TestClass.prototype, "cc");

      describe("fetch from class", function () {
        const id = fetchMetadata<string>(metakey.id, TestClass);
        const member = fetchMetadata<string>(metakey.member, TestClass, "cc");
        const method = fetchMetadata<string>(metakey.method, TestClass, "sayC");
        it(`${metakey.id} from class must be ${metavalue.id}`, function () {
          assert.strictEqual(id, metavalue.id);
        });
        it(`${metakey.member} from class must be ${metavalue.member}`, function () {
          assert.strictEqual(member, metavalue.member);
        });
        it(`${metakey.method} from class must be ${metavalue.method}`, function () {
          assert.strictEqual(method, metavalue.method);
        });
      });

      describe("fetch from class instance", function () {
        const t = new TestClass();
        const id = fetchMetadata<string>(metakey.id, t);
        const member = fetchMetadata<string>(metakey.member, t, "cc");
        const method = fetchMetadata<string>(metakey.method, t, "sayC");
        it(`${metakey.id} from class instance must be ${metavalue.id}`, function () {
          assert.strictEqual(id, metavalue.id);
        });
        it(`${metakey.member} from class instance must be ${metavalue.member}`, function () {
          assert.strictEqual(member, metavalue.member);
        });
        it(`${metakey.method} from class instance must be ${metavalue.method}`, function () {
          assert.strictEqual(method, metavalue.method);
        });
      });

      describe("fetch from prototype", function () {
        const id = fetchMetadata<string>(metakey.id, TestClass.prototype);
        const member = fetchMetadata<string>(metakey.member, TestClass.prototype, "cc");
        const method = fetchMetadata<string>(metakey.method, TestClass.prototype, "sayC");
        it(`${metakey.id} from class prototype must be ${metavalue.id}`, function () {
          assert.strictEqual(id, metavalue.id);
        });
        it(`${metakey.member} from class prototype must be ${metavalue.member}`, function () {
          assert.strictEqual(member, metavalue.member);
        });
        it(`${metakey.method} from class prototype must be ${metavalue.method}`, function () {
          assert.strictEqual(method, metavalue.method);
        });
      });
    });

    describe("attach class instance metadata", function () {
      class C {}
      class TestClass {
        cc!: C;
        sayC() {
          return "cc";
        }
      }
      const t = new TestClass();
      attachMetadata(metakey.id, metavalue.id, t);
      attachMetadata(metakey.method, metavalue.method, t, "sayC");
      attachMetadata(metakey.member, metavalue.member, t, "cc");

      describe("fetch from class", function () {
        const id = fetchMetadata<string>(metakey.id, TestClass);
        const member = fetchMetadata<string>(metakey.member, TestClass, "cc");
        const method = fetchMetadata<string>(metakey.method, TestClass, "sayC");
        it(`${metakey.id} from class must be null`, function () {
          assert.strictEqual(id, null);
        });
        it(`${metakey.member} from class must be null`, function () {
          assert.strictEqual(member, null);
        });
        it(`${metakey.method} from class must be null`, function () {
          assert.strictEqual(method, null);
        });
      });

      describe("fetch from class instance", function () {
        const id = fetchMetadata<string>(metakey.id, t);
        const member = fetchMetadata<string>(metakey.member, t, "cc");
        const method = fetchMetadata<string>(metakey.method, t, "sayC");
        it(`${metakey.id} from class instance must be ${metavalue.id}`, function () {
          assert.strictEqual(id, metavalue.id);
        });
        it(`${metakey.member} from class instance must be ${metavalue.member}`, function () {
          assert.strictEqual(member, metavalue.member);
        });
        it(`${metakey.method} from class instance must be ${metavalue.method}`, function () {
          assert.strictEqual(method, metavalue.method);
        });
      });

      describe("fetch from prototype", function () {
        const id = fetchMetadata<string>(metakey.id, TestClass.prototype);
        const member = fetchMetadata<string>(metakey.member, TestClass.prototype, "cc");
        const method = fetchMetadata<string>(metakey.method, TestClass.prototype, "sayC");
        it(`${metakey.id} from class prototype must be null`, function () {
          assert.strictEqual(id, null);
        });
        it(`${metakey.member} from class prototype must be null`, function () {
          assert.strictEqual(member, null);
        });
        it(`${metakey.method} from class prototype must be null`, function () {
          assert.strictEqual(method, null);
        });
      });
    });
  });
}
