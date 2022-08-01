import Picture from './components/Picture';
import Stopwatch from './components/Stopwatch';

import './Game.css';

export default function Game(props) {
  return (
    <div className="game">
      <Stopwatch />
      <Picture />
    </div>
  )
}