import style from './styles/index.module.scss';

import { Header, SectionFilter, SectionList, SectionSertch } from '@widgets/';

function App() {
  return (
    <div className={style.main}>
      <Header />
      <SectionSertch />
      <div className={style.flex}>
        <SectionFilter />
        <SectionList />
      </div>
    </div>
  );
}

export default App;
