# Controller

Controller 是路由的入口
如果仅仅修饰了访问方法装饰器而没有 controller 是不会被注册到路由中去的
你可以将一系列相关的路由归纳到一个类中

controller 还提供路由前缀的功能

```ts
@Controller("user")
export class UserController {}
```

此类下的所有路由都会以 /user/sub-router 的形式出现

考虑到 api 路由和其他路由分开
我们可以分钟自己到路由装饰器

```ts
export function ApiV1Router(router: string = "") {
  return Controller(`api/v1/${router}`);
}
```

调用

```ts
@ApiV1Router()
export class ApiController {}
```

生成
/api/v1
