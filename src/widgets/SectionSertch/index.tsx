// import { Logo } from '../../shared/ui';
import style from './index.module.scss';
import { Sertch } from '../../shared/assets/';
import { fetchVacancies } from '@/features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { setCity, setSearchText } from '@/features/modal/filtersSlice';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SectionSertch() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState('');

  const { city, skills, searchText } = useAppSelector((state) => state.filters);

  useEffect(() => {
    dispatch(setSearchText(searchParams.get('text') ?? searchText));
    dispatch(setCity(searchParams.get('city') ?? city));
  }, [city, dispatch, searchParams, searchText]);

  const onSearch = () => {
    const params: { [key: string]: string | string[] } = {
      text: text,
      city,
    };
    if (skills.length > 0) params.skills = skills;

    setSearchParams(params);
    dispatch(fetchVacancies({ text: text, city, skills }));
  };

  return (
    <div className={style.sectionSertch}>
      <div>
        <h1>Список вакансий</h1>
        <h2>по профессии Frontend-разработчик</h2>
      </div>
      <div>
        <img src={Sertch} alt="search" />
        <input
          type="text"
          placeholder="Должность или название компании"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
        />
        <button onClick={onSearch}>Найти</button>
      </div>
    </div>
  );
}
