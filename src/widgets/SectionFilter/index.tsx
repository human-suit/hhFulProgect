import style from './index.module.scss';
import { WhitePlus } from '@shared/assets/';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { useState } from 'react';
import { addSkill, removeSkill } from '@/features/modal/filtersSlice';
import { fetchVacancies } from '@/features/modal/modalSlice';
// import { useNavigate } from 'react-router-dom';

export default function SectionFilter() {
  const dispatch = useAppDispatch();
  const { city, skills, searchText } = useAppSelector((state) => state.filters);
  const [skillInput, setSkillInput] = useState('');

  // const navigate = useNavigate();

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();

    if (trimmedSkill) {
      dispatch(addSkill(trimmedSkill));

      const updatedSkills = [...skills, trimmedSkill];

      dispatch(
        fetchVacancies({ city, skills: updatedSkills, text: searchText.trim() })
      );
      setSkillInput('');
    }
  };

  // const handleAddCity = (selectedCity: string) => {
  //   dispatch(setCity(selectedCity));
  //   dispatch(
  //     fetchVacancies({ city: selectedCity, skills, text: searchText.trim() })
  //   );

  //   const path = cityToPath(selectedCity);
  //   navigate(path ? `/vacancies/${path}` : '/vacancies');
  // };

  // const cityToPath = (city: string) => {
  //   switch (city) {
  //     case 'Москва':
  //       return 'moscow';
  //     case 'Санкт-Петербург':
  //       return 'petersburg';
  //     case 'all':
  //       return '';
  //     default:
  //       return '';
  //   }
  // };

  return (
    <div className={style.sectionFilter}>
      <div>
        <p>Ключевые навыки</p>
        <input
          type="text"
          placeholder="Навык"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSkill();
            }
          }}
        />
        <button onClick={handleAddSkill}>
          <img src={WhitePlus} alt="plus" />
        </button>

        <div className={style.grid}>
          {skills.map((skill) => (
            <span key={skill}>
              <p>{skill}</p>
              <button onClick={() => dispatch(removeSkill(skill))}>✕</button>
            </span>
          ))}
        </div>
      </div>

      {/* <div className={style.filterCity}>
        <img src={locateIcon} alt="locate Icon" />
        <select
          id="city"
          name="city"
          value={city}
          onChange={(e) => handleAddCity(e.target.value)}
        >
          <option value="">Выберите город:</option>
          <option value="Москва">Москва</option>
          <option value="Санкт-Петербург">Санкт-Петербург</option>
          <option value="all">Все</option>
        </select>
      </div> */}
    </div>
  );
}
