import style from './index.module.scss';
import { LogoIcon } from '../../assets';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/vacancies/" className={style.logo}>
      <img src={LogoIcon} alt="HeadHUnter Icon" />
      <p>.FrontEnd</p>
    </Link>
  );
}
