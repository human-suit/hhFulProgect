import style from './index.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Vacancy } from '@/shared/types/vacancy';
import { Header } from '@/widgets';

export default function VacancyPage() {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);

  useEffect(() => {
    fetch(`https://api.hh.ru/vacancies/${id}`)
      .then((res) => res.json())
      .then(setVacancy);
  }, [id]);

  if (!vacancy) return <div>Загрузка...</div>;

  const cleanDescription = vacancy.description
    .replace(/<p>/g, '\n')
    .replace(/<li>/g, '• ')
    .replace(/<\/li>|<\/ul>|<\/ol>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .trim();

  return (
    <div className={style.VacancyPage}>
      <Header></Header>
      <h1>{vacancy.name}</h1>

      <div className={style.VacancyPage_body}>
        <ul>
          <li>
            {vacancy.name} в {vacancy.employer?.name}
          </li>
          <li>
            {vacancy.salary
              ? `${vacancy.salary.from ?? 'З/п не указана'} -  ${vacancy.salary.to ?? ''} ${vacancy.salary.currency}`
              : 'З/п не указана'}{' '}
            {vacancy.experience.name}
          </li>
          <li>{vacancy.employer?.name}</li>

          {vacancy.work_format?.some(
            (format) =>
              format.name === 'Гибрид' || format.name === 'Можно удалённо'
          ) && <li className={style.work}>Можно удалённо</li>}

          <li>{vacancy.address?.city ?? 'Город не указан'}</li>

          <li>
            <a
              href={vacancy.alternate_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Откликнуться на вакансию hh{' '}
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <h2>Компания</h2>
          </li>
          <li>{cleanDescription}</li>
          <li>
            <h3>О проекте</h3>
          </li>
          <li>{vacancy.snippet?.responsibility || 'Данные не найдены!'}</li>
        </ul>
      </div>
    </div>
  );
}
