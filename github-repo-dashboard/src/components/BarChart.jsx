import { Bar } from 'react-chartjs-2';

export default function BarChart({ commits }) {
  if (!commits|| Object.keys(commits).length === 0) return <p>No language data.</p>;
  const dates = commits.map(c => c.commit.author.date.slice(0, 10));
  const grouped = {};


  // count the number of commits for each date 
  dates.forEach(date => {
    grouped[date] = (grouped[date] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: 'Commits per Day',
        data: Object.values(grouped),
        backgroundColor: '#ff7043', 
        borderColor: "black"
      }
    ]
  };

  return (
    <div>
      <h3>Commit Activity</h3>
      <Bar data={chartData} />
    </div>
  );
}
