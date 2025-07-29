import { Link } from 'react-router-dom';
import style from './index.module.scss';
import { ErrorImg } from '@shared/assets/';

import { Header } from '@/widgets';

export default function ErrorPage() {
  return (
    <div className={style.VacancyPage}>
      <Header></Header>

      <div className={style.VacancyPage_body}>
        <div className={style.flex}>
          <div>
            <h1>Упс! Такой старницы не существует</h1>
            <p>Давайте перейдём к началу.</p>
          </div>
          <Link to="/">На г лавную</Link>
        </div>
        <img src={ErrorImg} alt="Кошечка" />
      </div>
    </div>
  );
}
