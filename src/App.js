import { Route, Routes } from 'react-router-dom';

import Layout from './layout/Layout';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="/game"  element={<Game />}/>
          <Route path="/leaderboard"  element={<Leaderboard />}/>
          <Route path="/auth" element={<Auth />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
