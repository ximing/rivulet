import { ServiceIdentifier } from './types/service-identifier.type';
import { ContainerIdentifier } from './types/container-identifier.type';
import { getContainer } from './container-registry';
import { singleScope } from './contants';
import { Container } from './container';
import { Constructable } from './types/constructable.type';

export function Inject<T = any>(
  serviceId: ServiceIdentifier<T>,
  opt?: {
    containerIdentifier?: ContainerIdentifier;
    params?: any;
    type?: any;
    scope?: string | Symbol;
  }
) {
  return function (target: any, key: string) {
    const options = Object.assign(
      {
        scope: singleScope,
      },
      opt
    );
    const cid = options.containerIdentifier;
    const container = cid ? getContainer(cid) : Container.root;
    container.register(serviceId, options.type || serviceId, options);

    const getter = function () {
      return container.resolve(serviceId as Constructable<T>, options.params);
    };

    const setter = function () {
      throw new Error('inject prop readonly');
    };

    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    }
  };
}
