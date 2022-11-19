import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import style from './Layout.module.css';

export default function Layout(props) {
  return (
    <div className={style["layout"]}>
      <Header />
      <div className={style["content"]}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}