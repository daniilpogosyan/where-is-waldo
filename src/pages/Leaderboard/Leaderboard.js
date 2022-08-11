import { useState, useEffect } from 'react';

import {
  getResults,
  getIcons,
  getResult
 } from '../../data/firestore';

import Select from './components/Select';
import Board from './components/Board';

import './Leaderboard.css';

 
export default function Leaderboard(props) {
  const [options, setOptions] = useState(null);
  const [currentOption, setCurrentOption] = useState(null);
  const [results, setResults] = useState(null);
  const [logMessage, setLogMessage] = useState('Loading...');
  const [currentUserResult, setCurrentUserResult] = useState(null);

  useEffect(() => {
    getIcons()
    .then((icons) => {
      const opts = icons.map(icon => ({
        name: icon.name,
        pictureId: icon.pictureId
      }));
      setOptions(opts);

      // see results on the first available picture-game
      setCurrentOption(opts[0]);
    })
  }, []);

  //update displayed set of results
  useEffect(() => {
    if (!currentOption) return
    
    getResult(currentOption.pictureId)
    .then(resultDoc => {
      setCurrentUserResult(resultDoc?.data())
    });

    getResults(currentOption.pictureId)
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
  }, [currentOption]);

  function handleSelect(option) {
    setCurrentOption(option);
  }

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-heading">
        Leaderboard
      </h2>
      <Select
        currentOption={currentOption}
        options={options}
        onSelect={handleSelect}
      />
      {
      (results && results.length > 0)
        ? (
            <Board
              results={results}
              currentUserResult={currentUserResult}
            />
          )
        : <p className="sub-text">{logMessage}</p>
      }
    </div>
    
  )
}
