import { useState, useEffect } from 'react';

import { getResults } from '../../data/firestore';

import Board from './components/Board';

import './Leaderboard.css';

 
export default function Leaderboard(props) {
  const [results, setResults] = useState(null);
  const [logMessage, setLogMessage] = useState('Loading...');

  useEffect(() => {
    getResults()
    .then(results => {
      if (results.length === 0)
        setLogMessage('No results yet. Be the first!')
      else 
        setLogMessage('');
  
      setResults(results);
      })
    .catch(err => {
      setLogMessage('Something went wrong :(');
      console.log(err)
    });
  }, [])

  return (
    <div className="leaderboard">
      {
      (results && results.length > 0)
        ? (
          <>
            <h2 className="leaderboard-heading">
              Leaderboard
            </h2>
            <Board
              results={results}
            />
          </>
          )
        : <p className="sub-text">{logMessage}</p>
      }
    </div>
    
  )
}
