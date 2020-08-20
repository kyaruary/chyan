import { Constructor, InjectorDescriptor, ControllerDescriptor, ActionDescriptor, ArgumentsDescriptor, InjectorType, EntityDescriptor } from "../@types/types";
import { PriorityList } from "../utils/PriorityList";
import { config } from "dotenv";
import { EnvConfig } from "./EnvConfig";
import * as Uuid from "uuid";
import { RouterUtils } from "./router";

export class MetaDataStorage {
  private static instacne: MetaDataStorage;
  static getMetaDataStroage() {
    if (!MetaDataStorage.instacne) {
      MetaDataStorage.instacne = new MetaDataStorage();
    }
    return MetaDataStorage.instacne;
  }

  static addServiceDescriptor(sd: InjectorDescriptor) {
    MetaDataStorage.getMetaDataStroage().serviceDescriptors.enqueue(sd);
  }

  static addControllerDescriptor(cd: ControllerDescriptor) {
    MetaDataStorage.getMetaDataStroage().controllerDescriptors.push(cd);
  }

  static addActionDescriptor(rmd: ActionDescriptor) {
    const prev = MetaDataStorage.getMetaDataStroage().actionDescriptors.get(rmd.target) ?? [];
    MetaDataStorage.getMetaDataStroage().actionDescriptors.set(rmd.target, [...prev, rmd]);
  }

  static addArgumentsDescriptor(ad: ArgumentsDescriptor) {
    const prev = this.getMetaDataStroage().argumentsDescriptors.get(ad.target) ?? [];
    this.getMetaDataStroage().argumentsDescriptors.set(ad.target, [...prev, ad]);
  }

  static addEntityDescriptor(ed: EntityDescriptor) {
    this.getMetaDataStroage().entityDescriptors.push(ed);
  }

  static addMiddleware(m: InjectorDescriptor) {
    this.getMetaDataStroage().serviceDescriptors.enqueue(m);
  }
  // descriptor metadata storage
  // routesMap: RouterMap = new Map();
  private serviceDescriptors: PriorityList<InjectorDescriptor> = new PriorityList();
  private controllerDescriptors: ControllerDescriptor[] = [];
  private actionDescriptors: Map<string, ActionDescriptor[]> = new Map<string, ActionDescriptor[]>();
  private argumentsDescriptors: Map<string, ArgumentsDescriptor[]> = new Map();
  private entityDescriptors: EntityDescriptor[] = [];
  static readonly envConfig: EnvConfig = new EnvConfig(config());

  // instantiation storage
  private serviceInstantiationMap: Map<string, object> = new Map<string, object>();

  private initializeController() {
    for (const cd of this.controllerDescriptors) {
      const instance = this.instantiationController(cd.proto, cd.args);
      const routers = this.actionDescriptors.get(cd.target) ?? [];
      for (const router of routers) {
        const args = this.argumentsDescriptors.get(cd.target)?.filter((arg) => arg.key === router.key) ?? [];
        RouterUtils.add({ actionDescriptor: router, prefix: cd.prefix, args, host: instance });
      }
      // RouterStorage.printRouter();
    }
  }

  injectConfig() {
    const proto = Reflect.getPrototypeOf(MetaDataStorage.envConfig) as any;
    proto.id = proto.id ?? Uuid.v4();
    this.serviceInstantiationMap.set(proto.id, MetaDataStorage.envConfig);
    return MetaDataStorage.envConfig;
  }

  private instantiationServices() {
    for (const s of this.serviceDescriptors) {
      // undo 参数不存在的情况
      const args: object[] = [];
      s.args.forEach((arg) => {
        if (this.serviceInstantiationMap.has(arg) !== undefined) {
          args.push(this.serviceInstantiationMap.get(arg)!);
        }
      });
      const instance = Reflect.construct(s.proto, args);
      if (s.type === InjectorType.Middleware) {
        // MiddlewareStorage.add(instance, s.middlewareTypes!);
      } else {
        this.serviceInstantiationMap.set(s.target, instance);
      }
    }
  }

  private instantiationController(cc: Constructor, args: string[]) {
    return Reflect.construct(
      cc,
      args.map((arg) => this.serviceInstantiationMap.get(arg))
    );
  }

  // private async initDatabase() {
  //   if (this.entityDescriptors.length !== 0) {
  //     /// 初始化数据库， 先拿配置文件
  //     const db = DinarDatabase.getMongoDBInstance();
  //     if (MetaDataStorage.envConfig.use_mongo) {
  //       try {
  //         for (const ed of this.entityDescriptors) {
  //           const model = db.collection<any>(ed.name);
  //           this.serviceInstantiationMap.set(ed.target, model);
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     } else {
  //       throw "do not enable mongo db from .env file";
  //     }
  //   }
  // }

  static async resolve() {
    const instacne = MetaDataStorage.getMetaDataStroage();
    instacne.injectConfig();
    // console.log(instacne.controllerDescriptor);
    // console.log(instacne.routerMethodDescriptor);
    // console.log(instacne.serviceDescriptor);

    // 首先连接数据库
    // instacne.initDatabase();
    // init entities undo
    instacne.instantiationServices();
    // console.log(instacne.serviceInstantiationMap);
    // init controllers doing
    instacne.initializeController();
  }
}
