import { Outlet } from 'react-router-dom';
import Header from '../Header';
import style from './index.module.scss';

export default function Layout() {
  return (
    <div className={style.Layout}>
      <Header />

      <Outlet />

      <footer>@2025</footer>
    </div>
  );
}
