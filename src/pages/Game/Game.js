import {
  useState,
  useEffect,
  useRef
} from 'react';
import { useParams } from 'react-router-dom';

import { getGamePicture, setResult } from '../../data/firestore.js';

import Picture from './components/Picture';
import Stopwatch from './components/Stopwatch';
import Dropdown from './components/Dropdown';
import GameModalWindow from './components/GameModalWindow';

import style from './Game.module.css';

export default function Game(props) {
  const { pictureId } = useParams();
  const targetsDB = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [dropDownPosition, setDropdownPosition] = useState(null);
  const [lastClickCoords, setLastClickCoords] = useState(null);
  const [targets, setTargets] = useState(null);
  const [stopwatchStatus, setStopwatchStatus] = useState('stop')
  const [timeResult, setTimeResult] = useState(0);
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
    console.log(didMount.current, timeResult)
    if (gameIsOn === false && timeResult > 0) {
      setResult({
        pictureId: pictureId,
        time: timeResult
      })
    }
  }, [timeResult])

  useEffect(() => {
    getGamePicture(pictureId)
      .then(data => {
        targetsDB.current = data.targets;
        setImgUrl(data.imgUrl);
        setGame()
      })
      

    // setGame is setter for state, which doesn't change over the time
    // pictureId is received from search params, so it doesn't change either
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(!didMount.current) {
      didMount.current = true;
      return
    }

    if(targets?.length === 0) {
      endGame();
    }
    // endGame doesn't change over the time
    // eslint-disable-next-line
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
    
    setDropdownPosition(absCoords);
    setLastClickCoords(relCoords)

  }

  function handlePressEscapeKey(e) {
    if (e.key === 'Escape') 
      setDropdownPosition(undefined)
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
    setDropdownPosition(null);
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
      setStopwatchStatus('start');
    }
  }

  function endGame() {
    setStopwatchStatus('stop');
    setGameIsReady(false);
    setGameIsOn(false);
    setGame();
  }


  return (
    <div className={style["game"]}>
      {gameIsOn === false && (
        <GameModalWindow
          gameIsReady={gameIsReady}
          startGame={startGame}
          lastGameTime={timeResult}
        />
      )}
      <Stopwatch
        status={stopwatchStatus}
        getTime={(time) => setTimeResult(time)}
      />
      <Dropdown
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