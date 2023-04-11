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
  TimeScale
} from "chart.js";
import BasicButton from "../Tools/BasicButton";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const Graph = () => {
  const options :any = {
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            hour: 'MM/DD'
          }
        },
        distribution: 'series'
      }],
    },
    plugins: {
      title: {
        display: true,
        text: "体重",
      },
    },
  };

  const labels = [
    { date: "2022-01-01", value: 10 },
    { date: "2022-01-02", value: 30 },
    { date: "2022-01-03", value: 70 },
    { date: "2022-01-04", value: 50 },
    { date: "2022-01-05", value: 40 },
    { date: "2022-01-06", value: 30 },
  ];

  const data = {
    labels: labels.map(date => dayjs(date.date).format("MM/DD")),
    datasets: [
      {
        label: "aaaaa",
        data: labels.map(label=> label.value),
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