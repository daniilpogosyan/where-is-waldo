import Picture from './components/Picture';
import Stopwatch from './components/Stopwatch';

import './Game.css';

export default function Game(props) {
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
    
    console.log(relCoords)
  }

  return (
    <div className="game">
      <Stopwatch />
      <Picture
        onClick={handleClickPicture}
      />
    </div>
  )
}