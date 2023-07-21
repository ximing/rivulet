import { resolve } from '../../src';
import { C2 } from './c2';

export class C1 {
  get c2a() {
    // 挂在到root Container上了
    return resolve(C2);
  }

  get c2b() {
    return resolve(C2);
  }
}
