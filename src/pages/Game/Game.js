import {
  useState,
  useEffect,
  useRef
} from 'react';

import { getTargets } from '../../data/targets';

import Picture from './components/Picture';
import Stopwatch from './components/Stopwatch';
import DropDown from './components/DropDown';

import './Game.css';

export default function Game(props) {
  const [dropDownPosition, setDropDownPosition] = useState(null);
  const [lastClickCoords, setLastClickCoords] = useState(null);
  const [targets, setTargets] = useState(null);
  const [stopwatchMillisec, setStopwatchMillisec] = useState(0);
  const stopwatchID = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', handlePressEscapeKey);

    // remove event, so listeners won't be multiplied if user click 
    // on other links (e.g Leaderboard )
    return () => {
      document.removeEventListener('keydown', handlePressEscapeKey);
    }
  }, []);

  useEffect(() => {
    setTargets(getTargets());
  }, []);

  useEffect(() => {
    if(targets?.length === 0)
      stopStopwatch()
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


  return (
    <div className="game">
      <Stopwatch
        elapsed={stopwatchMillisec}
        start={startStopwatch}
        stop={stopStopwatch}
      />
      <DropDown
        position={dropDownPosition}
        targets={targets}
        onChoose={handleChooseTarget}
      />
      <Picture
        onClick={handleClickPicture}
      />
    </div>
  )
}