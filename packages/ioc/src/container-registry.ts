import { Container } from './container';
import { ContainerIdentifier } from './types/container-identifier.type';

export const containerMap: Map<ContainerIdentifier, Container> = new Map();

export function registerContainer(container: Container): void {
  if (container instanceof Container === false) {
    throw new Error('Only Container instances can be registered.');
  }

  if (containerMap.has(container.id)) {
    throw new Error('Cannot register container with same ID.');
  }

  containerMap.set(container.id, container);
}

export function hasContainer(id: ContainerIdentifier): boolean {
  return containerMap.has(id);
}

export function getContainer(id: ContainerIdentifier): Container {
  const registeredContainer = containerMap.get(id);
  if (registeredContainer === undefined) {
    throw new Error('No container is registered with the given ID.');
  }
  return registeredContainer;
}
