import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ monthData, colour }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data representation of visits",
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
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dataArr = [];
  for (let i in monthData) {
    dataArr.push(monthData[i].count);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Visits",
        data: dataArr,
        backgroundColor: colour,
      },
    ],
  };

  return (
    <div className=" SmallPhones:overflow-x-auto" id="Bar-Chart-Container">
      <div className=" w-full flex justify-center SmallPhones:w-[500px] SmallPhones:aspect-video">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default BarChart;
