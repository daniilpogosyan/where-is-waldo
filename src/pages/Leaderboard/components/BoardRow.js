import Clock from '../../../components/Clock';

import './BoardRow.css';

export default function BoardRow(props) {
  const className = (
    "board-row "
    + (props.ofCurrentUser ? "current-user-result " : "main-text ")
  )
     
  return (
    <div className={className}>
      <span>{props.username}</span>
      <Clock millisec={props.time}/>
    </div>
  )
}