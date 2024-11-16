import { BaseTotem, TotemicTotem } from './types';

export default function totemic<
  T extends BaseTotem,
  Args extends any[],
  R
>(
  createTotemBoundContext: (totem: TotemicTotem<T>) => (...args: Args) => R
) {
  const totemPole = new WeakMap<TotemicTotem<T>, R>();
  
  return (totem: TotemicTotem<T>) => {
    return (...args: Args) => {
      const existingContext = totemPole.get(totem);
      if (existingContext) return existingContext;

      const newContext = createTotemBoundContext(totem)(...args);
      totemPole.set(totem, newContext);
      return newContext;
    };
  };
}
