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
import ChartTab from "src/components/ChartTab";

const DataPageContent = ({
  dataModel,
  dataConfigParams,
}: {
  dataModel?: DataModel;
  dataConfigParams: any;
}) => {
  const router = useRouter();
  const activeTab = router.query.tab ? String(router.query.tab) : "data";

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

    const X = dataModel.getDataByColNames(independentVars);
    const Y = dataModel.data.map((row) => row[row.length - 1]);

    // const X = data?.slice(1)?.map((row) => row[3]);
    // const Y = data?.slice(1)?.map((row) => row[7]);

    const [b_0, b_1] = calculateCoefficients(X, Y);

    const plotData = dataModel?.data?.map((row) => ({ x: row[3], y: row[7] }));
    // console.log("plotData", plotData);

    const x_max = Math.max(...X);

    console.log("b_0", b_0);
    console.log("b_1", b_1);

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
      <div>no data</div>
    ),
    chart: (
      <ChartTab
        equation={`y = ${b_0} + ${b_1} * x`}
        plotData={plotData}
        lineData={lineData}
      />
    ),
    regression:
      regressionType !== "logistic" ? (
        <LinearRegressionUI X={X} Y={Y} />
      ) : (
        <LogisticRegressionUI X={X} Y={Y} />
      ),
  };

  console.log("lineData", lineData);

  return (
    <>
      <Tabs activeTab={activeTab} />
      {tabMap[activeTab]}
    </>
  );
};

export default function Home() {
  const [data, setData] = useState<DataModel | null>();
  const router = useRouter();
  const { query } = router;

  const datasetId = String(query?.data) || "car";

  const dataConfigParams = dataConfig[datasetId];

  useEffect(() => {
    if (!dataConfigParams?.filename) {
      return;
    }
    setData(undefined);
    (async () => {
      const data = await fetch(`/data/${dataConfigParams.filename}`);
      const text = await data.text();
      const parsed = parseCsv(text, datasetId);
      setData(parsed);
    })();
  }, [datasetId, router.query?.data, dataConfigParams?.filename]);

  return (
    <Layout>
      {data && data.id === datasetId && (
        <DataPageContent
          key={datasetId}
          dataModel={data}
          dataConfigParams={dataConfigParams}
        />
      )}
    </Layout>
  );
}
