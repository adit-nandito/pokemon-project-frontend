import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonListPage from './containers/PokemonListPage';
import PokemonDetailPage from './containers/PokemonDetailPage';
import PokemonMyListPage from './containers/PokemonMyListPage';
import AppNavigator from './components/Elements/AppNavigator/AppNavigator';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PokemonListPage />
  },
  {
    path: '/detail/:id',
    element: <PokemonDetailPage />
  },
  {
    path: '/mypokemon',
    element: <PokemonMyListPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <AppNavigator />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
