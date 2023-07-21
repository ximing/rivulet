import { Container } from './container';
import { ServiceIdentifier } from './types/service-identifier.type';
import { Constructable } from './types/constructable.type';
import { ContainerIdentifier } from './types/container-identifier.type';
import { hasContainer, registerContainer } from './container-registry';
export function resolve<T = any>(
  serviceId: ServiceIdentifier<T>,
  params?: any,
  container?: Container | ContainerIdentifier,
  parentContainer?: Container
): T {
  if (container && !(container instanceof Container)) {
    if (!hasContainer(container)) {
      if (parentContainer) {
        container = parentContainer.createChild(container);
      } else {
        container = new Container(container);
        registerContainer(container);
      }
    }
  }
  return ((container as Container) || Container.root).resolve<T>(
    serviceId as Constructable<T>,
    params
  ) as T;
}

export function register<T = any>(
  serviceId: ServiceIdentifier<T>,
  type: Constructable<T>,
  options?: {
    // eager
    scope: string | Symbol;
  },
  container?: Container
) {
  return (container || Container.root).register<T>(serviceId, type, options);
}
