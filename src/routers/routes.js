import PokemonDetail from '../layouts/PokemonDetail';
import PokemonList from '../layouts/PokemonList';
import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage';
import { getDetailPokemon, getListPokemon } from '../services/APIService';

const routes = [
  {
    path: '/home',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    loader: getListPokemon
  },
  {
    path: '/detail/:name',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    loader: getDetailPokemon
  }
  // {
  //   path: '/mypokemon',
  //   element: <PokemonMyListPage />
  // }
];

export default routes;
