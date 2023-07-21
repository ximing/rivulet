import { Constructable } from './constructable.type';
import { ContainerIdentifier } from './container-identifier.type';

export type Meta<T = any> = {
  scope: ContainerIdentifier;
  type: Constructable<T>;
};
