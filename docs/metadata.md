# Metadata

## attachMetadata & fetchMetadata

attachMetadata/fetchMetadata 提供了附加/获取元信息的能力

attachMetadata 可以将元信息附加到 class，class prototype 和 class instance 上

在原生的 Reflect.defineMetada api 中, class 和 class prototype 定义的元信息是相互隔离的，class instance 可以共享 prototype 上的信息。
所以我们将对 class 上的元信息操作代理到 class prototype 上(design 相关的除外， 所以要获取相关元信息必须通过 class 获取)
这样 prototype 和 instance 都可以共享到 class 上的元信息

class 和 class prototype 则无法访问直接定义在 class instance（私有） 上信息
