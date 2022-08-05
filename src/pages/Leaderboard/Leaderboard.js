import { useState, useEffect } from 'react';

import firebaseConfig from '../../data/firebase-config';
import {
  initializeApp
} from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

import Board from './components/Board';

import './Leaderboard.css';


initializeApp(firebaseConfig);

const db = getFirestore();

export default function Leaderboard(props) {
  const [results, setResults] = useState(null);
  const [logMessage, setLogMessage] = useState('Loading...');

  useEffect(() => {
    const q = query(collection(db, 'results'), where('pictureId', '!=', ''));

    getDocs(q)
    .then(snapshot => {
      const displayedResults = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        displayedResults.push({
          username: data.username,
          time: data.time
        })
      });

      if (displayedResults.length === 0)
        setLogMessage('No results yet. Be the first!')
      else 
        setLogMessage('');

        setResults(displayedResults);
    })
    .catch(err => {
      setLogMessage('Something went wrong :(');
      console.log(err)
    })
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
