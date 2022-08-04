import { Link } from 'react-router-dom';

import UserContainer from './UserContainer';

import './Header.css';

export default function Header(props) {
  return (
    <header className="header">
      <h1 className="heading">
        <Link className="link" to="/">
          Where's Waldo?
        </Link>
      </h1>
      <ul className="header-links">
        <li>
          <Link className="link" to="/game">
            Game
          </Link>
        </li>
        <li>
          <Link className="link" to="/leaderboard">
            Leaderboard
          </Link>
        </li>
      </ul>
      <UserContainer />
    </header>
  )
}