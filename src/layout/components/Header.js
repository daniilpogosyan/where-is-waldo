import { Link } from 'react-router-dom';

import UserContainer from './UserContainer';

import style from './Header.module.css';

export default function Header(props) {
  return (
    <header className={style["header"]}>
      <h1 className={style["heading"]}>
        <Link className={style["link"]} to="/">
          Where's Waldo?
        </Link>
      </h1>
      <ul className={style["links"]}>
        <li>
          <Link className={style["link"]} to="/leaderboard">
            Leaderboard
          </Link>
        </li>
      </ul>
      <UserContainer />
    </header>
  )
}