import { ServiceIdentifier } from './types/service-identifier.type';
import { Meta } from './types/meta.type';

/**
 * 根据提供的元数据创建或获取服务实例。
 *
 * @template T - 服务的类型。
 *
 * @param {any} serviceMap - 用于存储服务实例的映射表。
 * @param {ServiceIdentifier<T>} serviceId - 需要创建或获取的服务的标识符。
 * @param {Meta<T>} meta - 用于创建服务实例的元数据。
 * @param {any} [params] - 创建服务实例时使用的可选参数。
 *
 * @returns {T} 从映射表中获取的或新创建的服务实例。
 */
export function createIns<T>(
  serviceMap: any,
  serviceId: ServiceIdentifier<T>,
  meta: Meta<T>,
  params?: any
) {
  let ins = serviceMap.get(serviceId);
  if (!ins) {
    ins = new meta.type(params);
    serviceMap.set(serviceId, ins);
  }
  return ins;
}
