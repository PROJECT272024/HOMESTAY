'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the Chart.js library

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
`  };*/
  
 
  const data = {
    datasets: [
      {
        label: 'Type 1',
        data: [
          { x: 'Rular', y: 20 },
          { x: 'Urban', y: 10 }
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Group 2',
        data: [
          { x: 'Private', y: 5 },
          { x: 'Government', y: 12 }
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Group 3',
        data: [
          { x: 'Normal', y: 18 },
          { x: 'Heritage', y: 7 },
          { x: 'Heritage 3', y: 3 },
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      indexAxis: 'x',
      barThickness: 50,
    },
  };
  


const GropuedBarChart = () => {
  return <Bar data={data} options={options} />;
};

export default GropuedBarChart;