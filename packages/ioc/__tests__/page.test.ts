import { Container, containerScope } from '../src/index';

class PageService {}

class Comp1Service {}

class Comp2Service {}

describe('dep spec:', () => {
  it('single', function () {
    const container = new Container('page_1');
    const c: any = container;
    container.register(PageService, PageService, { scope: containerScope });
    container.register('comp1_1', Comp1Service, { scope: containerScope });
    container.register('comp1_2', Comp1Service, { scope: containerScope });
    container.register('comp2', Comp2Service, { scope: containerScope });
    const comp1_1 = container.resolve<Comp1Service>('comp1_1');
    const comp1_2 = container.resolve<Comp1Service>('comp1_2');
    expect(comp1_1).toEqual(comp1_2);
    expect(comp1_1).not.toBe(comp1_2);
    container.dispose();
  });
});
