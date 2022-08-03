import Clock from '../../../components/Clock';

import './BoardRow.css';

export default function BoardRow(props) {
  return (
    <div className="board-row main-text">
      <span>{props.username}</span>
      <Clock millisec={props.time}/>
    </div>
  )
}