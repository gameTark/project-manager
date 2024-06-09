export const is = {
  renderer: typeof process !== "object" && typeof window === "object",
  preload: typeof process === "object" && typeof window === "object",
  main: typeof process === "object" && typeof window !== "object",
};
