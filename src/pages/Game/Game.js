import { useState, useEffect } from 'react';

import Picture from './components/Picture';
import Stopwatch from './components/Stopwatch';
import DropDown from './components/DropDown';

import './Game.css';

export default function Game(props) {
  const [dropDownPosition, setDropDownPosition] = useState(null);

  useEffect(() => {
    document.addEventListener('keydown', handlePressEscapeKey);

    // remove event, so listeners won't be multiplied if user click 
    // on other links (e.g Leaderboard )
    return () => {
      document.removeEventListener('keydown', handlePressEscapeKey);
    }
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
  }

  function handlePressEscapeKey(e) {
    if (e.key === 'Escape') 
      setDropDownPosition(undefined)
  }
  

  return (
    <div className="game">
      <Stopwatch />
      <DropDown
        position={dropDownPosition}
      />
      <Picture
        onClick={handleClickPicture}
      />
    </div>
  )
}