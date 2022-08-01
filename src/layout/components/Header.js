import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header>
      <h1>
        <Link to="/">Where's Waldo?</Link>
      </h1>
      <ul>
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
      </ul>
    </header>
  )
}