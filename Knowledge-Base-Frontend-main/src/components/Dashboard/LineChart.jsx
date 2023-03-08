import React from "react";
import { Chart as ChartJS, CategoryScale } from "chart.js/auto";
// import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
ChartJS.register(CategoryScale);

const LineChart = () => {
  const labels = ["jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const chartData = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "#2579ffcc",
          tension: 0.1,
        },
      ],
    },
    option: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  };
  return (
    <div
      className={
        "w-[82%] aspect-video mx-auto mt-12 rounded-lg shadow-2xl flex items-center justify-center p-6"
      }
    >
      <Line {...chartData} />
    </div>
  );
};

export default LineChart;
