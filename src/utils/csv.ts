import { isNumeric } from "./utils";
import DataModel from "./DataModel";

function parseCsv2DArray(csvText: string) {
  const parsed = csvText
    .split(/[\n\r]+/)
    .map((row) =>
      row.split(",").map((val) => (isNumeric(val) ? Number(val) : val))
    );

  return parsed.filter((row) => row.length === parsed[0].length);
}

export function parseCsv(csvText: string, filename: string) {
  const parsed2DArray = parseCsv2DArray(csvText);

  // Note: this won't work correctly if duplicate column header names, or empty column headers
  // const obj = parsed2DArray[0].reduce(
  //   (accum, cur, index) => ({
  //     ...accum,
  //     [cur]: parsed2DArray.slice(1).map((row) => row[index]),
  //   }),
  //   {}
  // );
  const obj = new DataModel(parsed2DArray, filename);
  return obj;
  // return parsed2DArray;
}
