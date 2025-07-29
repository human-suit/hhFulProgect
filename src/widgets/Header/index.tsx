import { Logo } from '../../shared/ui';
import style from './index.module.scss';
import { PersonIcon } from '../../shared/assets/';
import { CustomLink } from '@shared/ui/';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <div className={style.header}>
      <Logo />
      <ul>
        <li>
          <CustomLink to="/vacancies/">
            <p>Вакансии FE</p>
            {location.pathname.startsWith('/vacancies') && <div></div>}
          </CustomLink>
        </li>
        <li>
          <img src={PersonIcon} alt="PersonIcon" />
          <CustomLink to="/about/">
            <p>Обо мне</p>
            {location.pathname.startsWith('/about') && <div></div>}
          </CustomLink>
        </li>
      </ul>
    </div>
  );
}
