import Clock from '../../../components/Clock';

import style from './BoardRow.module.css';

export default function BoardRow(props) {
  const className = props.ofCurrentUser
    ? `${style['board-row']} ${style['current-user-result']}`
    : `${style['board-row']} main-text`;
     
  return (
    <div className={className}>
      <span>{props.username}</span>
      <Clock millisec={props.time}/>
    </div>
  )
}