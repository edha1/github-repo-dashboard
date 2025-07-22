import React, { useState } from 'react';
import axios from 'axios';
import RepoStats from './RepoStats';
import PieChart from './PieChart';
import DoughnutChart from './DoughtnutChart';
import BarChart from './BarChart';

function GetData() {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoData, setRepoData] = useState(null);
  const [languages, setLanguages] = useState({});
  const [commits, setCommits] = useState([]);
  const [contributors, setContributors] = useState([]);


  const token = import.meta.env.VITE_GITHUB_TOKEN; // insert API token into .env file 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parts = repoUrl.split('/');
    const owner = parts[parts.length - 2];
    const repo = parts[parts.length - 1];

    try {

      const headers = { Authorization: `Bearer ${token}` };

      // takes an array of promises and waits for all of them to complete, then returns their results together.
      const [repoRes, langRes, commitRes, contributors ] = await Promise.all([
        axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers }), // metadata about repo
        axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers }), // languages used 
        axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`, { headers }), // last 100 commits 
        axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`, { headers }), // list of contributors 
      ]);

      setRepoData(repoRes.data);
      setLanguages(langRes.data);
      setCommits(commitRes.data);
      setContributors(contributors.data);

    } catch (err) {
      alert('Repo not found or token issue');
      console.error(err);
    }
  };

  return (
    <>
      <div className="body-wrapper">
      <div className='header-wrapper'>
        <h1 className="header-text">📊 GitHub Repo Dashboard</h1>
        <form onSubmit={handleSubmit} className='data-form'>
        <input className='input-bar'
          type="text"
          placeholder="Enter GitHub repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <button>Analyse</button>
      </form>
      </div>
            
      
    </div>
    <div className="info-wrapper">
  {repoData && (
    <div className="chart repo-data">
      <RepoStats repo={repoData} />
    </div>
  )}

    <div className="charts-grid">
        {Object.keys(languages).length > 0 && (
          <div className="chart languages">
            <PieChart data={languages} />
          </div>
        )}

        {commits.length > 0 && (
          <div className="chart commits">
            <BarChart commits={commits} />
          </div>
        )}

        {contributors && contributors.length > 0 && (
          <div className="chart contributors">
            <DoughnutChart data={contributors} />
          </div>
        )}
      </div>
    </div>

    </>

  );
}

export default GetData;
