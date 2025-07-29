import style from './index.module.scss';
import { Link, useMatch } from 'react-router-dom';
export default function CustomLink({ children, to, ...props }) {
  const match = useMatch(to);

  return (
    <Link className={match ? style.active : style.none} to={to} {...props}>
      {children}
    </Link>
  );
}
