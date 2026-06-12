import ErrorPage from '../components/pages/ErrorPage.js';
import MainPage from '../components/pages/MainPage.js';
import LoginPage from '../components/pages/LoginPage.js';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <Navigate to="/login" replace />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
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
