import {
  useState,
  useEffect,
  useRef
} from 'react';
import { useParams } from 'react-router-dom';

import { getGamePicture, setResult } from '../../data/firestore.js';

import Picture from './components/Picture';
import Stopwatch from './components/Stopwatch';
import DropDown from './components/DropDown';
import GameModalWindow from './components/GameModalWindow';

import './Game.css';

export default function Game(props) {
  const { pictureId } = useParams();
  const targetsDB = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [dropDownPosition, setDropDownPosition] = useState(null);
  const [lastClickCoords, setLastClickCoords] = useState(null);
  const [targets, setTargets] = useState(null);
  const [stopwatchMillisec, setStopwatchMillisec] = useState(0);
  const stopwatchID = useRef(null);
  const didMount = useRef(false);
  const imageLoaded = useRef(false);

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
    getGamePicture(pictureId)
      .then(data => {
        targetsDB.current = data.targets;
        setImgUrl(data.imgUrl);
        setGame()
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
    setStopwatchMillisec(0);
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
    imageLoaded.current = true;
  }

  function getRandomElements(arr, count) {
    if (!(arr && arr.length > 0))
      return

    const returnedElements = [];
    const availableIndexes = [...Array(arr.length).keys()];
    for (let i = 0; i < count && availableIndexes.length > 0; i++) {
      const indexOfIndex = Math.floor(Math.random() * availableIndexes.length);
      const indexOfElement = availableIndexes.splice(indexOfIndex, 1)[0];
      const selectedElement = arr[indexOfElement];
      returnedElements.push(selectedElement);
    }
    return returnedElements
  }

  function setGame() {
    let newTargets = getRandomElements(targetsDB.current, 3);
    setTargets(newTargets);
    setGameIsReady(true);
  }

  function startGame() {
    if (imageLoaded && gameIsReady) {
      setGameIsOn(true);
      startStopwatch();
    }
  }

  function endGame() {
    stopStopwatch();
    setGameIsReady(false);
    setGameIsOn(false);

    setResult({
      time: stopwatchMillisec
    })

    setGame();
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