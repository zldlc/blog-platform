export const randomizeId = (): string => {
  return Math.random().toString(36).slice(2);
};
