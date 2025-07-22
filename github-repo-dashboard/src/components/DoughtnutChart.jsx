import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart({ data }) {
    if (!data || Object.keys(data).length === 0) return <p>No contributor data.</p>;
  const chartData = {
    labels: data.map(contributor => contributor.login),
    datasets: [
      {
        data: data.map(contributor => contributor.contributions),
        backgroundColor: [
          '#42a5f5', '#66bb6a', '#ffa726', '#ab47bc', '#ff7043',
          '#29b6f6', '#26c6da', '#9ccc65', '#ec407a', '#7e57c2'
        ], 
        borderColor: "black"
      }
    ]
  };

  return (
    <div>
      <h3>Commits by Contributor</h3>
      <Doughnut data={chartData} />
    </div>
  );
}
