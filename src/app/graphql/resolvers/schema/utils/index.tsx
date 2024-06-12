export const createPrepareQuery = (size: number): string => new Array(size).fill("?").join(",");
