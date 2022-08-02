import './BoardRow.css';

export default function BoardRow(props) {
  return (
    <div className="board-row main-text">
      <span>{props.username}</span>
      <span>{props.time}</span>
    </div>
  )
}