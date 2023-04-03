import React from "react";
import Menu from "../Menu/Menu";
import "./Graph.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BasicButton from "../Tools/BasicButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "体重",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "aaaaa",
        data: [10, 40, 30, 40, 50, 80],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Menu />
      <div className="container">
        <h1 className="pageTitle">Graph</h1>
        <div className="graphButton">
          <BasicButton>体重・体脂肪率を記録する</BasicButton>
        </div>
        <div className="graph">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Graph;
