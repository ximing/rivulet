export interface RegistryMap {
  [key: string | symbol]: new () => any;
}
