import { getFileContentAsString, getIntersection } from "@monorepo/shared";

const stringData = getFileContentAsString("./data/input.txt");

const lines = stringData.trim().split("\n");

const ranges = lines.map((line) => line.trim().split(","));

function toLots(range: string): number[] {
  const [start, end] = range.split("-").map((value) => parseInt(value, 10));

  let result: number[] = [];
  for (let i = start; i <= end; i++) {
    result = [...result, i];
  }

  return result;
}

const lots = ranges.map(([rangeA, rangeB]) => {
  return [toLots(rangeA), toLots(rangeB)];
});

function isSubset<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size > b.size) {
    return false;
  }

  return [...a].reduce((curr, item) => curr && b.has(item), true);
}

const redundancyCount = lots
  .map(([lotA, lotB]) => {
    const setA = new Set(lotA);
    const setB = new Set(lotB);

    return isSubset(setA, setB) || isSubset(setB, setA);
  })
  .reduce((curr, val) => (val ? curr + 1 : curr), 0);

console.log("Part 1 (contained sets):", redundancyCount);

const overlapCount = lots
  .map(([lotA, lotB]) => {
    const intersection = getIntersection(lotA, lotB);
    return intersection.length > 0;
  })
  .reduce((curr, val) => (val ? curr + 1 : curr), 0);

console.log("Part 2 (overlapping sets):", overlapCount);
