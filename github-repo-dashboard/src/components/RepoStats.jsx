export default function RepoStats({ repo }) {
  return (
    <div>
      <h2>{repo.full_name}</h2>
      <p>{repo.description}</p>
      <p>⭐ Stars: {repo.stargazers_count}</p>
      <p>🍴 Forks: {repo.forks_count}</p>
      <p>🐛 Open Issues: {repo.open_issues_count}</p>
    </div>
  );
}
