import { useState, useEffect } from 'react';

import { getUsersResults } from '../../data/usersResults';

import Board from './components/Board';

import './Leaderboard.css';

export default function Leaderboard(props) {
  const [results, setState] = useState(null);

  useEffect(() => {
    setState(getUsersResults());
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
        : <p className="sub-text">No results yet...</p>
      }
    </div>
    
  )
}
