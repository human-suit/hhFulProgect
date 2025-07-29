import style from './index.module.scss';
import { Header } from '@/widgets';

export default function AboutPage() {
  return (
    <div className={style.AboutPage}>
      <Header></Header>
      <div className={style.AboutPage_body}>
        <div className={style.white}>
          <h1>Vadim Filippov</h1>
          <p>
            Да я, успокойся все в порядке, я уже тут -- Frontend developer.
            Приложения на React + TypeScript + Redux Toolkit.
          </p>
        </div>
      </div>
    </div>
  );
}
