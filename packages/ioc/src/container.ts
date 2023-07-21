import { ContainerIdentifier } from './types/container-identifier.type';
import { ServiceIdentifier } from './types/service-identifier.type';
import {
  containerScope,
  rootContainerId,
  singleScope,
  transientScope,
} from './contants';
import {
  containerMap,
  getContainer,
  hasContainer,
  registerContainer,
} from './container-registry';
import { createIns } from './utils';
import { Meta } from './types/meta.type';
import { Constructable } from './types/constructable.type';
import { RegistryMap } from './types/register.type';

export class Container<T extends RegistryMap = RegistryMap> {
  static root: Container = new Container(rootContainerId);

  public readonly id!: ContainerIdentifier;

  private parent: Container;

  private children: Container[] = [];

  private metaMap: Map<ServiceIdentifier, Meta> = new Map();

  private serviceMap: Map<ServiceIdentifier, any> = new Map();

  private transientSet: Set<any> = new Set();

  constructor(id: ContainerIdentifier, parent?: Container) {
    this.id = id;
    this.parent = parent || Container.root;
  }

  /**
   * 为容器注册类。
   *
   * @template T - 需要注册的类。
   *
   * @param {ServiceIdentifier<T>} serviceId - 需要注册的类的标识符。
   * @param {Constructable<T>} type - 类，用于创建服务的实例。
   * @param {object} options - 注册服务时的选项，包括 scope。
   */
  register<T = any>(
    serviceId: ServiceIdentifier<T>,
    type: Constructable<T>,
    options?: {
      // eager
      scope: string | Symbol;
    }
  ) {
    const meta = Object.assign({ scope: singleScope }, options, { type });
    this.metaMap.set(serviceId, meta);
  }

  registerSelf<T = any>(
    type: Constructable<T>,
    options?: {
      // eager
      scope: string | Symbol;
    }
  ) {
    return this.register(type, type, options);
  }
  /**
   * 通过服务标识符解析服务。
   *
   * @template T - 需要解析的服务的类型。
   *
   * @param {ServiceIdentifier<T>} serviceId - 需要解析的服务的标识符。
   * @param {any} [params] - 解析服务时使用的可选参数。
   *
   * @returns {T | undefined} 如果找到，则返回解析的实例，否则返回 undefined。
   */
  resolve<K extends keyof T>(serviceId: K, params?: any): InstanceType<T[K]>;
  resolve<K extends keyof T, U>(serviceId: K, params?: any): U;
  resolve<U>(serviceId: ServiceIdentifier<U>, params?: any): U;
  resolve<K extends keyof T, U>(
    serviceId: K | ServiceIdentifier<U>,
    params?: any
  ): U | InstanceType<T[K]> | unknown {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let cur = this;
    do {
      const meta = cur.metaMap.get(serviceId);
      if (meta) {
        switch (meta.scope) {
          case singleScope:
            return createIns(
              Container.root.serviceMap,
              serviceId,
              meta,
              params
            );
          case containerScope:
            return createIns(this.serviceMap, serviceId, meta, params);
          case transientScope: {
            const ins = new meta.type(params);
            this.transientSet.add(ins);
            return ins;
          }
          default:
            throw new Error('unknow scope');
        }
      }
      // @ts-ignore
      cur = cur.parent as Container<T>;
    } while (cur);
    return undefined;
  }

  /**
   * 创建子容器。
   *
   * @param {ContainerIdentifier} id - 子容器的标识符。
   * @returns {Container} 创建的子容器实例。
   */
  createChild(id: ContainerIdentifier) {
    if (hasContainer(id)) {
      return getContainer(id);
    }
    const child = new Container<T>(id, this);
    registerContainer(child);
    this.children.push(child);
    return child;
  }

  /**
   * 销毁某个作用域下的所有实例。
   */
  dispose() {
    // 树的遍历过程
    // 保存一个实例的引用，下面会做 parent.children 的清理
    const c = this.children;
    // 干掉子容器
    c.forEach((child) => child.dispose());
    // 干掉所有的transient scope实例
    this.transientSet.forEach((ins) => ins.dispose && ins.dispose());
    // 干掉所有container scope实例
    this.serviceMap.forEach((ins) => {
      ins.dispose && ins.dispose();
    });
    this.serviceMap.clear();
    this.transientSet.clear();
    this.metaMap.clear();
    // 从父容器中移除
    this.parent.children = this.parent.children.filter(
      (child) => child !== this
    );
    // 从容器注册表中移除
    containerMap.delete(this.id);
  }
}
