import { createRoot } from 'react-dom/client';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AboutPage, ErrorPage, VacancyPage } from './pages';
import { Layout } from './widgets';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<App />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/vacancies" element={<App />} />
      <Route path="/vacancies/city/:city" element={<App />} />
      <Route path="/vacancies/:id" element={<VacancyPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
