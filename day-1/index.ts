import { getFileContentAsString } from "@monorepo/shared";

const stringData = getFileContentAsString("./data/input.txt");

const groups = stringData.split("\n\n").map((group) => {
  return group
    .trim()
    .split("\n")
    .map((value) => parseInt(value, 10));
});

const totals = groups.map((group) =>
  group.reduce((curr, value) => curr + value, 0)
);

const maxValue = Math.max(...totals);

const sortedTotals = totals.slice();
sortedTotals.sort((a, b) => b - a);

const [first, second, third] = sortedTotals;

console.log("Part 1 (max value):", maxValue);
console.log("Part 2 (top three sum): ", first + second + third);
