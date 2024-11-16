// Base constraint for totems to ensure they're objects
export type BaseTotem = Record<string, unknown>;

export type TotemicTotem<T extends BaseTotem> = T;
