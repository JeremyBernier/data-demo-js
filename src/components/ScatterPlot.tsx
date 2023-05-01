import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top" as const,
//     },
//     title: {
//       display: true,
//       text: "Chart.js Line Chart",
//     },
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//     },
//   },
// };

// export const data = {
//   datasets: [
//     {
//       label: "A dataset",
//       data: Array.from({ length: 100 }, () => ({
//         x: faker.datatype.number({ min: -100, max: 100 }),
//         y: faker.datatype.number({ min: -100, max: 100 }),
//       })),
//       backgroundColor: "rgba(255, 99, 132, 1)",
//     },
//   ],
// };

const options = {
  scales: {
    x: {
      type: "linear",
      position: "bottom",
    },
    // xAxes: [
    //   {
    //     type: "linear",
    //     position: "bottom",
    //     // ticks: {
    //     //   min: -1,
    //     //   max: 8,
    //     //   stepSize: 1,
    //     //   fixedStepSize: 1,
    //     // },
    //   },
    // ],
    // yAxes: [
    //   {
    //     // ticks: {
    //     //   min: -2,
    //     //   max: 4,
    //     //   stepSize: 1,
    //     //   fixedStepSize: 1,
    //     // },
    //   },
    // ],
  },
};

export default function ScatterPlot({ plotData, lineData }) {
  const datasets: any[] = [
    {
      type: "scatter",
      label: "Data",
      data: plotData,
      backgroundColor: "rgb(255, 99, 132)",
    },
  ];

  if (lineData) {
    datasets.push({
      type: "line",
      label: "Line",
      data: lineData,
      backgroundColor: ["rgba(123, 83, 252, 0.8)"],
      borderColor: ["rgba(33, 232, 234, 1)"],
      borderWidth: 1,
      pointRadius: 0,
    });
  }

  const data = {
    datasets,
  };

  return <Scatter options={options} data={data} />;
}
