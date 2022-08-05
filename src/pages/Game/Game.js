import {
  useState,
  useEffect,
  useRef
} from 'react';

import firebaseConfig from '../../data/firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
  setDoc,
  addDoc
 } from 'firebase/firestore';

import { getGamePicture } from '../../data/firestore.js';

import Picture from './components/Picture';
import Stopwatch from './components/Stopwatch';
import DropDown from './components/DropDown';
import GameModalWindow from './components/GameModalWindow';

import './Game.css';

initializeApp(firebaseConfig);

const db = getFirestore();
const resultsCol = collection(db, 'results');

export default function Game(props) {
  const [imgUrl, setImgUrl] = useState(null);
  const [dropDownPosition, setDropDownPosition] = useState(null);
  const [lastClickCoords, setLastClickCoords] = useState(null);
  const [targets, setTargets] = useState(null);
  const [stopwatchMillisec, setStopwatchMillisec] = useState(0);
  const stopwatchID = useRef(null);
  const didMount = useRef(false);

  const [gameIsReady, setGameIsReady] = useState(false);
  const [gameIsOn, setGameIsOn] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handlePressEscapeKey);

    // remove event, so listeners won't be multiplied if user click 
    // on other links (e.g Leaderboard )
    return () => {
      document.removeEventListener('keydown', handlePressEscapeKey);
    }
  }, []);

  useEffect(() => {
    getGamePicture('mortal-kombat')
      .then(data => {
        setTargets(data.targets);
        setImgUrl(data.imgUrl);
      })

    return () => {
      stopStopwatch();
    }
  }, []);

  useEffect(() => {
    if(!didMount.current) {
      didMount.current = true;
      return
    }

    if(targets?.length === 0) {
      endGame();
    }
  }, [targets])

  //return true if distance between points is lower than eps
  function pointsAreClose(p1, p2, eps) {
    const distance = Math.hypot(
      p1.x - p2.x,
      p1.y - p2.y,
    )
    return distance < eps
  }

  const handleClickPicture = (e) => {
    const imageRect = e.target.getBoundingClientRect()
    const absCoords = {
      x: e.clientX - imageRect.left,
      y: e.clientY - imageRect.top
    }
    const relCoords = {
      x: absCoords.x / imageRect.width,
      y: absCoords.y / imageRect.height
    }
    
    setDropDownPosition(absCoords);
    setLastClickCoords(relCoords)

  }

  function handlePressEscapeKey(e) {
    if (e.key === 'Escape') 
      setDropDownPosition(undefined)
  }
  
  const handleChooseTarget = (name) => {
    const target = targets.find(target => target.name === name);
    const targetFound = pointsAreClose(
      target.origin,
      lastClickCoords,
      target.radius
    )
    if (targetFound)
      setTargets(targets.filter(target => target.name !== name))
    setDropDownPosition(null);
  }
  
  function startStopwatch() {
    const dt = 10;
    stopwatchID.current = setInterval(() => {
      setStopwatchMillisec(elapsed => elapsed + dt)
    }, dt);
    console.log('stopwatch is running! id:', stopwatchID.current)
  }

  function stopStopwatch() {
    clearInterval(stopwatchID.current);
    console.log('stopwatch is stopped! id:', stopwatchID.current)
  }

  const handleLoadImg = (e) => {
    setGameIsReady(true)
  }

  function startGame() {
    setGameIsOn(true);
    startStopwatch();
  }

  function endGame() {
    stopStopwatch();
    setGameIsReady(false);
    setGameIsOn(false);

    const currentUser = getAuth().currentUser;

    if (currentUser === null) return

    const q = query(
      resultsCol,
      where('uid', '==', currentUser.uid),
      where('pictureId', '==', 'd6UbKCNeBwUUo09UFCq5'),
      limit(1)
    );
    
    const newData = {
      pictureId: 'd6UbKCNeBwUUo09UFCq5',
      time: stopwatchMillisec,
      uid: currentUser.uid,
      username: currentUser.displayName
    };

    getDocs(q)
      .then(snapshot => {
        if (snapshot.docs.length === 0) {
          addDoc(resultsCol, newData)
            .then(() => console.log('data is created.'));
          return
        }
        
        
        if(snapshot.docs.length === 1
          && snapshot.docs[0].data().time > stopwatchMillisec) {
          setDoc(snapshot.docs[0].ref, newData)
            .then(() => console.log('data is updated.'));
          return 
        }
      })
  }


  return (
    <div className="game">
      {gameIsOn === false && (
        <GameModalWindow
          gameIsReady={gameIsReady}
          startGame={startGame}
          lastGameTime={stopwatchMillisec}
        />
      )}
      <Stopwatch
        elapsed={stopwatchMillisec}
      />
      <DropDown
        position={dropDownPosition}
        targets={targets}
        onChoose={handleChooseTarget}
      />
      <Picture
        imgUrl={imgUrl}
        onLoad={handleLoadImg}
        onClick={handleClickPicture}
      />
    </div>
  )
}