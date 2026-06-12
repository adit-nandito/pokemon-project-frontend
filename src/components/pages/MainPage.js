import { lazy } from 'react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';

import './style.css';

const PokemonList = lazy(() => import('../layouts/PokemonList'));
const PokemonDetail = lazy(() => import('../layouts/PokemonDetail'));

const MainPage = () => {
  const __generateMainPage = () => {
    const location = useLocation();
    if (_.startsWith(location.pathname, '/detail')) {
      return <PokemonDetail />;
    }

    return <PokemonList />;
  };

  return <div id="MainPage">{__generateMainPage()}</div>;
};
export default MainPage;
