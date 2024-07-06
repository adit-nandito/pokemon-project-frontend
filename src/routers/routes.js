import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage';

const routes = [
  {
    path: '/home',
    element: <MainPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/detail/:name',
    element: <MainPage />,
    errorElement: <ErrorPage />
  }
];

export default routes;
