const fs = require("fs");

const buffer = fs.readFileSync("./data/input.txt");

const stringData = buffer.toString("utf-8");

const rucksacks = stringData.trim().split("\n");

const compartments = rucksacks.map((rucksack) => {
  const compartmentA = rucksack.slice(0, rucksack.length / 2).split("");
  const compartmentB = rucksack.slice(rucksack.length / 2).split("");

  return [compartmentA, compartmentB];
});

function getIntersection(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  const intersection = new Set(
    [...set1].filter((element) => set2.has(element))
  );

  return [...intersection];
}

const duplicates = compartments.map(([compartmentA, compartmentB]) => {
  const intersection = getIntersection(compartmentA, compartmentB);

  // Assume all duplicates are same
  return intersection[0];
});

function isLowerCase(letter) {
  return letter === letter.toLowerCase();
}

function prioritizeItem(item) {
  const letterScore = item.toLowerCase().charCodeAt(0) - 96;
  return isLowerCase(item) ? letterScore : letterScore + 26;
}

const duplicatePriorities = duplicates.map(prioritizeItem);

const duplicatePriorityTotal = duplicatePriorities.reduce(
  (curr, val) => curr + val,
  0
);

console.log("Part 1 (duplicates priority total):", duplicatePriorityTotal);

function chunk(arr, chunkSize) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

const groups = chunk(rucksacks, 3);
const badges = groups.map(([rucksackA, rucksackB, rucksackC]) => {
  const intersection = getIntersection(
    rucksackA,
    getIntersection(rucksackB, rucksackC)
  );
  return intersection[0];
});

const badgePriorities = badges.map(prioritizeItem);

const badgePriorityTotal = badgePriorities.reduce((curr, val) => curr + val, 0);

console.log("Part 2 (badge priority total):", badgePriorityTotal);
