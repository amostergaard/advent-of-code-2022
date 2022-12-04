export function sum(...values: number[]): number {
  return values.reduce((curr, val) => val + curr, 0);
}
