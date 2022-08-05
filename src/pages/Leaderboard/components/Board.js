import BoardRow from './BoardRow';

import './Board.css';

export default function Board({results}) {
  return (
    <ol className="board">
      {results.map(result => (
        <li key={result.username + result.time}>
          <BoardRow
            username={result.username}
            time={result.time}
          />
        </li>
      ))}
    </ol>
  )
}