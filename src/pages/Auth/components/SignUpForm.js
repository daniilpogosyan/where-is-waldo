import firebaseConfig from '../../../data/firebase-config';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  reload
} from 'firebase/auth';

initializeApp(firebaseConfig);

export default function SignUpForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credential => updateProfile(credential.user, {
      displayName: username
    }))
    .then(() => reload(getAuth().currentUser))
    .catch(err => console.log(err));
  }

  return (
    <form
      onSubmit={handleSubmit}
      action=""
    >
      <label>
        Username:
        <input type="text" name="username" required/>
      </label>
      <label>
        Email:
        <input type="email" name="email" required/>
      </label>
      <label>
        Password:
        <input type="password" name="password" required/>
      </label>

    <button>Sign Up</button>  

    </form>
  )
}