import {
  useState,
  useEffect,
  useRef
} from 'react';

import { getGamePicture } from '../../data/firestore.js';

import Picture from './components/Picture';
import Stopwatch from './components/Stopwatch';
import DropDown from './components/DropDown';
import ModalWindow from '../../components/ModalWindow';

import './Game.css';

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
  }


  return (
    <div className="game">
      {gameIsOn === false && (
        <ModalWindow>
          {
            gameIsReady
            ? (
              <button onClick={startGame}>
                Start!
              </button>
            )
            : <p className='sub-text'>Loading...</p>
          }
        </ModalWindow>
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