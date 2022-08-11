import BoardRow from './BoardRow';

import './Board.css';

export default function Board({results, currentUserResult}) {
  return (
    <>
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
      {currentUserResult && (
        <BoardRow
          username={currentUserResult.username}
          time={currentUserResult.time}
        />
      )}
    </>
  )
}