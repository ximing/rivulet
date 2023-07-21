import { Container, containerScope } from '../src/index';
import { C1 } from './class/c1';
import { C2 } from './class/c2';
describe('dep spec:', () => {
  it('instanceof', function () {
    expect(Container.root instanceof Container).toEqual(true);
  });

  it('single', function () {
    const container = new Container('');
    const c: any = container;
    container.register(C1, C1);
    expect(container.resolve(C1)).toEqual(container.resolve(C1));
    expect(Object.keys(c.serviceMap).length).toEqual(0);
    expect((Container.root as any).serviceMap.size).toEqual(1);
    container.dispose();
  });

  it('single', function () {
    const container = new Container('');
    const c: any = container;
    container.register(C1, C1);
    container.register(C2, C2);
    const c1 = container.resolve<C1>(C1);
    expect(c1.c2a).toBe(c1.c2b);
    container.dispose();
  });

  it('inherit single', function () {
    const container1 = new Container('1');
    const container2 = container1.createChild('2');
    container1.register(C1, C1);
    container1.register(C2, C2);
    const c1 = container2.resolve<C1>(C1);
    expect(c1.c2a).toBe(c1.c2b);
    const c11 = container1.resolve<C1>(C1);
    expect(c11.c2a).toBe(c11.c2b);
    expect(c1.c2a).toBe(c11.c2b);
    container1.dispose();
  });

  it('inherit container', function () {
    const container1 = new Container('1');
    const container2 = container1.createChild('2');
    container1.register(C1, C1, { scope: containerScope });
    container1.register(C2, C2, { scope: containerScope });
    const container2Class1 = container2.resolve<C1>(C1);
    expect(container2Class1.c2a).toBe(container2Class1.c2b);
    const container1Class1 = container1.resolve<C1>(C1);
    expect(container1Class1.c2a).toBe(container1Class1.c2b);

    expect(container1Class1).not.toBe(container2Class1);

    expect(container1).not.toBe(container2);

    expect(container1Class1.c2a).toBe(container2Class1.c2a);
    container1.dispose();
  });
});
