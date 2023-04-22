import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import Chart.js elements

ChartJS.register(ArcElement, Tooltip, Legend); // Register Chart.js elements

function TaskData({ tasks }) {
  // Extracting colors from tasks array
  const colors = tasks.map(task => task.color);

  // Counting occurrences of each color
  const colorCounts = colors.reduce((acc, color) => {
    if (acc[color]) {
      acc[color]++;
    } else {
      acc[color] = 1;
    }
    return acc;
  }, {});

  // Extracting labels and data from colorCounts object
  const labels = Object.keys(colorCounts);
  const data = Object.values(colorCounts);

  const backgroundColors = labels.map(label => {
    if (label === 'red') {
      return '#f05654';
    } else if (label === 'blue') {
      return '#4169E1';
    } else if (label === 'yellow') {
      return '#FFD700';
    }
  });
  
  // Creating chart data object
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors // Use the backgroundColors array to map colors
      }
    ]
  };

  return (
    <div id='task-data' >
      <div style={{ width: '255px', height: '160px' }}>
        <Doughnut
          data={chartData}
          options={{ maintainAspectRatio: false,
            plugins: {
            legend: {display: false},
            tooltips: {enabled: false}
          }}}
        />
      </div>
    </div>
  );
  
}

export default TaskData;
