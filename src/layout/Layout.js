import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import './Layout.css';

export default function Layout(props) {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}