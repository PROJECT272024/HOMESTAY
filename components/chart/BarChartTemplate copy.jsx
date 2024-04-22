'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the Chart.js library

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

  /*const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ['#f7931a', '#4ac0c4', '#f7c51a', '#4ac0c4', '#f7931a', '#4ac0c4'],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    ],
  };*/
  
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
      },
      {
        label: 'Female',
        data: femaleData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  


const BarChart = () => {
  return <Bar data={data} options={options} />;
};

export default BarChart;