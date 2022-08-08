import { useState } from 'react';

import TabBar from './components/TabBar'; 
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

import './Auth.css';

export default function Auth(props) {
  const [tab, setTab] = useState('Log in');

  return (
    <div className="auth main-text">
      <TabBar
        tabNames={['Log in', 'Sign up']}
        setTab={setTab}
        currentTab={tab}
      />
      {
        tab === 'Log in'
        ? <SignInForm />
        : <SignUpForm />
      }
    </div>
  )
}
