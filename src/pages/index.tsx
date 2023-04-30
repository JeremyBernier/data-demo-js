import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Inter, Rowdies } from "next/font/google";
import ScatterPlot from "src/components/ScatterPlot";
import Table from "src/components/Table";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "src/components/Layout";
import LinearRegressionUI from "src/components/LinearRegressionUI";
import LogisticRegressionUI from "src/components/LogisticRegressionUI";
import { parseCsv } from "src/utils/csv";
import dataConfig from "src/dataConfig";
import DataModel from "src/utils/DataModel";
import Tabs from "src/components/Tabs";
import { calculateCoefficients } from "src/utils/math";

// const inter = Inter({ subsets: ["latin"] });

const DataPageContent = ({
  dataModel,
  dataConfigParams,
}: {
  dataModel?: DataModel;
  dataConfigParams: any;
}) => {
  const router = useRouter();
  const activeTab = String(router.query.tab) || "data";

  console.log("DataPageContent dataConfigParams", dataConfigParams);
  console.log("DataPageContent, dataModel", dataModel);

  const { independentVars, regressionType } = dataConfigParams;

  const {
    plotData = [],
    lineData = [],
    b_0,
    b_1,
    X,
    Y,
  } = useMemo(() => {
    if (!dataModel?.data.length || !independentVars) {
      return {};
    }

    // const X = independentVars.map(colName => data[colName]);
    // const Y = independentVars.map(colName => data[colName]);

    console.log("dataModel", dataModel);

    const X = dataModel.getDataByColNames(independentVars);
    const Y = dataModel.data.map((row) => row[row.length - 1]);

    console.log("index.tsx", X);

    // const X = data?.slice(1)?.map((row) => row[3]);
    // const Y = data?.slice(1)?.map((row) => row[7]);

    const [b_0, b_1] = calculateCoefficients(X, Y);

    const plotData = dataModel?.data?.map((row) => ({ x: row[3], y: row[7] }));
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

    return { plotData, lineData, b_0, b_1, X, Y };
  }, [dataModel, independentVars]);

  const tabMap = {
    data: dataModel?.data?.length ? (
      <Table
        headings={dataModel.columns}
        rows={dataModel.data}
        independentVars={independentVars}
      />
    ) : (
      <div></div>
    ),
    chart: (
      <div>
        <h3>{`y = ${b_0} + ${b_1} * x`}</h3>
        <ScatterPlot plotData={plotData} lineData={lineData} />
      </div>
    ),
    regression:
      regressionType !== "logistic" ? (
        <LinearRegressionUI X={X} Y={Y} />
      ) : (
        <LogisticRegressionUI X={X} Y={Y} />
      ),
  };

  return (
    <>
      <Tabs activeTab={activeTab} />
      {(router.query?.tab && tabMap[activeTab]) || null}
    </>
  );
};

export default function Home() {
  const [data, setData] = useState<DataModel | null>();
  const router = useRouter();
  const { query } = router;

  const dataset = String(query?.data) || "car";

  const dataConfigParams = dataConfig[dataset];
  console.log("Home dataConfigParams", dataConfigParams);

  useEffect(() => {
    console.log("useEffect bro", !dataConfigParams?.filename);
    if (!dataConfigParams?.filename) {
      return;
    }
    setData(undefined);
    console.log("!setData undefined");
    (async () => {
      const data = await fetch(`/data/${dataConfigParams.filename}`);
      const text = await data.text();
      const parsed = parseCsv(text, dataset);
      setData(parsed);
    })();
  }, [dataset, router.query?.data, dataConfigParams?.filename]);

  return (
    <Layout>
      {data && data.id === dataset && (
        <DataPageContent
          key={dataset}
          dataModel={data}
          dataConfigParams={dataConfigParams}
        />
      )}
    </Layout>
  );
}
