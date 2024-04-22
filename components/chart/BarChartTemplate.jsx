'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the Chart.js library

const BarChart = ({labels,dataSet}) => {
  const data = {
    labels:labels,
    datasets: dataSet
  }
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;