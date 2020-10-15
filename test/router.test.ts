import { RouterStorage } from "../dist/core/router";
import { Controller, Get, Post } from "../dist";
import { resolve } from "../dist/core/Ioc";
import { strictEqual } from "assert";

export function testRouter() {
  describe("router", function () {
    const router = RouterStorage.getRouter();
    beforeEach(function () {
      router.stack = [];
    });
    it("router length === 1", async function () {
      @Controller("test")
      class TestController {
        @Get("name")
        name() {
          return "name";
        }
      }
      await resolve();
      strictEqual(1, router.stack.length);
    });

    it("router length === 2", async function () {
      @Controller("test")
      class TestController {
        @Get("name")
        name() {
          return "name";
        }
        @Post("name1")
        name2() {
          return "name2";
        }
      }
      await resolve();
      strictEqual(2, router.stack.length);
    });

    it("static router path match", async function () {
      @Controller("test")
      class TestController {
        @Get("name")
        name() {
          return "name";
        }
      }
      await resolve();
      strictEqual("/test/name", router.stack[0].path);
    });
  });
}
