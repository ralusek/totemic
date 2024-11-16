import totemic from '../dist';

describe('basic totemic functionality', () => {
  it('should properly maintain context in association with different totems', async () => {
    const getContext = totemic((totem) => {
      let count = 0;
      return (step = 1) => {
        return {
          increment: () => count += step,
          getCount: () => count,
        };
      };
    });

    const totemA = {};
    const totemB = {};

    const contextA = getContext(totemA)(1);
    const contextB = getContext(totemB)(0.5);

    expect(contextA.getCount()).toBe(0);
    expect(contextB.getCount()).toBe(0);
    
    contextA.increment();
    expect(contextA.getCount()).toBe(1);
    expect(contextB.getCount()).toBe(0);

    contextB.increment();
    expect(contextA.getCount()).toBe(1);
    expect(contextB.getCount()).toBe(0.5);

    contextB.increment();
    expect(contextA.getCount()).toBe(1);
    expect(contextB.getCount()).toBe(1);

    contextB.increment();
    expect(contextA.getCount()).toBe(1);
    expect(contextB.getCount()).toBe(1.5);
  });

  it('should reuse existing context for the same totem', () => {
    const getContext = totemic((totem) => {
      let count = 0;
      return () => ({
        increment: () => count++,
        getCount: () => count,
      });
    });

    const totem = {};
    const contextA = getContext(totem)();
    const contextB = getContext(totem)();

    contextA.increment();
    expect(contextA.getCount()).toBe(1);
    expect(contextB.getCount()).toBe(1);
    expect(contextA === contextB).toBe(true);
  });
});
