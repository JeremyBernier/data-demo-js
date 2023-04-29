import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Inter, Rowdies } from "next/font/google";
import ScatterPlot from "src/components/ScatterPlot";
import Table from "src/components/Table";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "src/components/Layout";
import RegressionMultiple from "src/components/RegressionMultiple";
import { parseCsv } from "src/utils/csv";

// const inter = Inter({ subsets: ["latin"] });

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

const Tabs = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="mr-2">
        <Link
          href={{
            pathname: "/",
            query: {
              ...query,
              tab: "data",
            },
          }}
          aria-current="page"
          className={`tab ${
            !router.query.tab || router.query.tab === "data" ? "active" : ""
          }`}
        >
          Data
        </Link>
      </li>
      <li className="mr-2">
        <Link
          href={{
            pathname: "/",
            query: {
              ...query,
              tab: "chart",
            },
          }}
          className={`tab ${router.query.tab === "chart" ? "active" : ""}`}
        >
          Chart
        </Link>
      </li>
      <li className="mr-2">
        <Link
          href={{
            pathname: "/",
            query: {
              ...query,
              tab: "regression",
            },
          }}
          className={`tab ${router.query.tab === "regression" ? "active" : ""}`}
        >
          Regression
        </Link>
      </li>
    </ul>
  );
};

const Main = ({ data }) => {
  const router = useRouter();

  const {
    plotData = [],
    lineData = [],
    b_0,
    b_1,
  } = useMemo(() => {
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

    return { plotData, lineData, b_0, b_1 };
  }, [data]);

  const tabMap = {
    data: data?.length ? (
      <Table headings={data[0]} rows={data.slice(1)} />
    ) : (
      <div></div>
    ),
    chart: (
      <div>
        <h3>{`y = ${b_0} + ${b_1} * x`}</h3>
        <ScatterPlot plotData={plotData} lineData={lineData} />
      </div>
    ),
    regression: <RegressionMultiple data={data} />,
  };

  return (
    <>
      <Tabs />
      {(router.query?.tab && tabMap[router.query.tab]) || null}
    </>
  );
};

export default function Home() {
  const [data, setData] = useState<(string | number)[][]>();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const csvFileName =
        router.query?.data === "car" ? "car_data.csv" : "real_estate.csv";
      const data = await fetch(`/data/${csvFileName}`);
      const text = await data.text();
      const parsed = parseCsv(text);
      console.log("parsed", parsed);
      setData(parsed);
    })();
  }, [router.query?.data]);

  return (
    <Layout>
      <Main data={data} />
    </Layout>
  );
}
