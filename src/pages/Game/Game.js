import { useState, useEffect } from 'react';

import { getTargets } from '../../data/targets';

import Picture from './components/Picture';
import Stopwatch from './components/Stopwatch';
import DropDown from './components/DropDown';

import './Game.css';

export default function Game(props) {
  const [dropDownPosition, setDropDownPosition] = useState(null);
  const [lastClickCoords, setLastClickCoords] = useState(null);
  const [targets, setTargets] = useState([]);

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
  

  return (
    <div className="game">
      <Stopwatch />
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