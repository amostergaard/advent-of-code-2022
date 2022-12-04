export function getIntersection<T>(arr1: T[], arr2: T[]): T[] {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  const intersection = new Set(
    [...set1].filter((element) => set2.has(element))
  );

  return [...intersection];
}
