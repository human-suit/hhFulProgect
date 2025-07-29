import style from './index.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { Vacancy } from '@/shared/types/vacancy';
import { useEffect } from 'react';
import { fetchVacancies } from '@/features/modal/modalSlice';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function SectionList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { city } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { list, loading, error } = useAppSelector((state) => state.vacancies);
  const { skills, searchText } = useAppSelector((state) => state.filters);

  useEffect(() => {
    dispatch(
      fetchVacancies({
        city: cityToPath(city) ?? '',
        skills,
        text: searchText.trim(),
      })
    );
  }, [dispatch, city, skills, searchText]);

  useEffect(() => {
    setCurrentPage(1);
  }, [city, skills, searchText]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const cityToPath = (city: string) => {
    switch (city) {
      case 'moscow':
        return 'Москва';
      case 'petersburg':
        return 'Санкт-Петербург';
      case 'all':
        return '';
      default:
        return '';
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVacancies = list.slice(startIndex, endIndex);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  return (
    <div className={style.SectionList}>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}

      <div className={style.flex}>
        <NavLink
          to="/vacancies/city/moscow"
          end
          className={({ isActive }) =>
            isActive ? `${style.click} ${style.active}` : style.click
          }
        >
          Москва
        </NavLink>
        <NavLink
          to="/vacancies/city/petersburg"
          end
          className={({ isActive }) =>
            isActive ? `${style.click} ${style.active}` : style.click
          }
        >
          Санкт-Петербург
        </NavLink>
      </div>

      {Array.isArray(list) &&
        currentVacancies.map((vacancy: Vacancy) => (
          <ul key={vacancy.id}>
            <li>
              {vacancy.name} в {vacancy.employer?.name}
            </li>
            <li>
              {vacancy.salary
                ? `${vacancy.salary.from ?? 'З/п не указана'} ${vacancy.salary.currency}`
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
              <button onClick={() => navigate(`/vacancies/${vacancy.id}`)}>
                Смотреть вакансию
              </button>
              <a
                href={vacancy.alternate_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Откликнуться</button>
              </a>
            </li>
          </ul>
        ))}
      <div className={style.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={style.arrow}
        >
          ←
        </button>

        {totalPages <= 7 ? (
          Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={i + 1 === currentPage ? style.activePage : ''}
            >
              {i + 1}
            </button>
          ))
        ) : (
          <>
            {Array.from({ length: 5 }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={i + 1 === currentPage ? style.activePage : ''}
              >
                {i + 1}
              </button>
            ))}

            {currentPage > 5 && <span className={style.dots}>...</span>}

            <button
              onClick={() => setCurrentPage(totalPages)}
              className={currentPage === totalPages ? style.activePage : ''}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={style.arrow}
        >
          →
        </button>
      </div>
    </div>
  );
}
