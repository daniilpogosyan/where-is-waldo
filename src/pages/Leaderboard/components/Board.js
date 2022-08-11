import BoardRow from './BoardRow';

import './Board.css';

export default function Board({results, currentUserResult}) {
  return (
    <>
      <ol className="board">
        {results.map(result => (
          <li key={result.username + result.time}>
            <BoardRow
              ofCurrentUser={currentUserResult?.uid === result.uid}
              username={result.username}
              time={result.time}
            />
          </li>
        ))}
      </ol>
      {currentUserResult && (
        <BoardRow
          ofCurrentUser={true}
          username={currentUserResult.username}
          time={currentUserResult.time}
        />
      )}
    </>
  )
}