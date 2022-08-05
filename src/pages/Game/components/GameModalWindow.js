import ModalWindow from '../../../components/ModalWindow';
import Clock from '../../../components/Clock';

export default function GameModalWindow(props) {
  return (
    <ModalWindow>
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
          <button onClick={props.startGame}>
            Start!
          </button>
        )
        : <p className='sub-text'>Loading...</p>
      }
    </ModalWindow>
  )
}