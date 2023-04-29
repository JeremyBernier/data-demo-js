import { isNumeric } from "./utils";

function parseCsv2DArray(csvText: string) {
  const parsed = csvText
    .split(/[\n\r]+/)
    .map((row) =>
      row.split(",").map((val) => (isNumeric(val) ? Number(val) : val))
    );

  return parsed.filter((row) => row.length === parsed[0].length);
}

export function parseCsv(csvText: string) {
  const parsed2DArray = parseCsv2DArray(csvText);
  return parsed2DArray;
}
