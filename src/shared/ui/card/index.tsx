import style from './index.module.scss';
import { useState } from 'react';

type Props = {
  product: number;
  setSum: (id: number, newItem: number, count: number) => void;
};

// https://api.hh.ru/openapi/redoc#tag/Poisk-vakansij/operation/get-vacancies?industry=7&professional_role=96

export default function Card({ product, setSum }: Props) {
  const [count, setCount] = useState(1);

  return <div className={style.main} key={product.id}></div>;
}
