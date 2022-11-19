import ModalWindow from '../../../components/ModalWindow';
import Clock from '../../../components/Clock';

import style from './GameModalWindow.module.css';

export default function GameModalWindow(props) {
  return (
    <ModalWindow>
      <div className={`${style['content']}`}>
        {
          props.lastGameTime
          ? (
            <p className="main-text">
              You did it for <Clock millisec={props.lastGameTime} />.
            </p>
          )
          : null
        }
        {
          props.gameIsReady
          ? (
            <button
              onClick={props.startGame}
              className={`${style['button']} main-text`}
            >
              {props.lastGameTime ? "Play Again" : "Start!"}
            </button>
          )
          : <p className='sub-text'>Loading...</p>
        }
      </div>
    </ModalWindow>
  )
}