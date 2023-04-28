import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Inter, Rowdies } from "next/font/google";
import ScatterPlot from "src/components/ScatterPlot";
import Table from "src/components/Table";

const inter = Inter({ subsets: ["latin"] });

const isNumeric = (num: any): boolean =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) &&
  !isNaN(num as number);

function parseCsv(csvText: string) {
  const parsed = csvText
    .split(/[\n\r]+/)
    .map((row) =>
      row.split(",").map((val) => (isNumeric(val) ? Number(val) : val))
    );

  return parsed.filter((row) => row.length === parsed[0].length);
}

// const plotData = [
//   {
//     x: 0,
//     y: 2,
//   },
//   {
//     x: 5,
//     y: 10,
//   },
//   {
//     x: 10,
//     y: 9,
//   },
//   {
//     x: 4,
//     y: 5.5,
//   },
// ];

// Calculates Linear Regression coefficients using Ordinary Least Squares
// y = b_0 + b_1 * x
function calculateCoefficients(x: number[], y: number[]): [number, number] {
  if (!x?.length || !y.length) {
    return [null, null];
  }
  const n = x.length;
  const x_mean = x.reduce((prev, cur) => prev + cur, 0) / n;
  const y_mean = y.reduce((prev, cur) => prev + cur, 0) / n;

  const ss_xy =
    x.reduce((prev, cur, i) => prev + cur * y[i], 0) - n * x_mean * y_mean;
  const ss_xx =
    x.reduce((prev, cur) => prev + Math.pow(cur, 2)) - n * Math.pow(x_mean, 2);

  const b_1 = ss_xy / ss_xx;
  const b_0 = y_mean - b_1 * x_mean;

  return [b_0, b_1];
}

export default function Home() {
  const [data, setData] = useState<(string | number)[][]>();
  useEffect(() => {
    (async () => {
      const data = await fetch("/data/real_estate.csv");
      const text = await data.text();
      const parsed = parseCsv(text);
      console.log("parsed", parsed);
      setData(parsed);
    })();
  }, []);

  console.log("whattup");

  const { plotData = [], lineData = [] } = useMemo(() => {
    if (!data?.length || data.length < 2) {
      return {};
    }
    const X = data?.slice(1)?.map((row) => row[3]);
    const Y = data?.slice(1)?.map((row) => row[7]);

    console.log("X", X);
    console.log("Y", Y);

    const [b_0, b_1] = calculateCoefficients(X, Y);

    console.log("b_0, b_1", b_0, b_1);

    const plotData = data?.slice(1)?.map((row) => ({ x: row[3], y: row[7] }));
    // console.log("plotData", plotData);

    // const x_min = Math.min(...X);
    const x_max = Math.max(...X);

    const lineData = [
      {
        x: 0,
        y: b_0,
      },
      {
        x: x_max,
        y: b_0 + x_max * b_1,
      },
    ];

    console.log("lineData", lineData);

    return { plotData, lineData };
  }, [data]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* {data && <Table headings={data[0]} rows={data.slice(1)} />} */}
      <ScatterPlot plotData={plotData} lineData={lineData} />
    </main>
  );
}
