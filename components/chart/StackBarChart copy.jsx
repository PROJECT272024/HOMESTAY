'use client'
import React from 'react'
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const test = {
    A: {
      male: 20,
      female: 10,
    },
    B: {
      male: 2,
      female: 8,
    },
    C: {
      male: 16,
      female: 23,
    },
    D: {
      male: 10,
      female: 15,
    },
  };

const labels = Object.keys(test);
const maleData = labels.map((key) => test[key].male);
const femaleData = labels.map((key) => test[key].female);

const data = {
  labels,
  datasets: [
    {
      label: 'Male',
      data: maleData,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      stack: 'stack1',
    },
    {
      label: 'Female',
      data: femaleData,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      stack: 'stack1',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      stacked: true,
    },
  },
};

const StackBarChart = () => {
  return (
        <Bar data={data} options={options} />
  )
}

export default StackBarChart