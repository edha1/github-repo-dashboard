import { Pie } from 'react-chartjs-2';

export default function PieChart({ data }) {
   if (!data || Object.keys(data).length === 0) return <p>No language data.</p>;
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726', '#ab47bc', '#ff7043'], 
        borderColor: "black"
      }
    ]
  };

  return (
    <div>
      <h3>Language Breakdown</h3>
      <Pie data={chartData} />
    </div>
  );
}
