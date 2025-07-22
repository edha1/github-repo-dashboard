import React from 'react'

const TopContributors = ({ contributors }) => {
 if (!contributors || contributors.length === 0) return <p>No contributors found.</p>;

  // show top 5 contributors
  const topContributors = contributors.slice(0, 5);

  return (
    <div>
        {topContributors.map(({ login, contributions}) => (
          <span key={login}>
            {login}:  <span>{contributions} commits</span>
          </span>
        ))}
    </div>
  );
}

export default TopContributors