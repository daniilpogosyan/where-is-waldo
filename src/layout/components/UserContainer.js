import {
  getAuth,
  onIdTokenChanged,
  signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './UserContainer.css';

export default function UserContainer(props) {
  //it won't work if use user object instead of username
  const [username, setUsername] = useState(getAuth().currentUser?.displayName);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(getAuth(), (user) => {
      setUsername(user?.displayName);
    })

    return () => unsubscribe()
  }, [])

  const userIsAuthorized = (username !== null && username !== undefined);

  return (
    <div className="user-container drop-down-container drop-down-container--on-hover">
      {
        userIsAuthorized
        ? <span>{username}</span>
        : <Link className="link" to='/auth'>Log in</Link>
      }
      <div className="drop-down main-text">
        {
          userIsAuthorized
          ? <button
              onClick={() => {
                signOut(getAuth());
                console.log(getAuth().currentUser)
              }}>
              Log out  
            </button>
          : null
        }
      </div>
    </div>
  )
}