import firebaseConfig from '../../../data/firebase-config';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth';

import style from './Form.module.css';

initializeApp(firebaseConfig);

export default function SignInForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(getAuth(), email, password)
    .then(() => e.target.reset())
    .catch(err => console.log(err))
  }

  return (
    <form
      className={style["form"]}
      onSubmit={handleSubmit}
      action=""
    >
      <label>
        Email:
        <input type="email" name="email" required/>
      </label>
      <label>
        Password:
        <input type="password" name="password" required/>
      </label>

    <button>Sign In</button>  

    </form>
  )
}