import { readFileSync } from "fs";

export function getFileContentAsString(filepath: string) {
  const buffer = readFileSync(filepath);
  return buffer.toString("utf-8");
}
