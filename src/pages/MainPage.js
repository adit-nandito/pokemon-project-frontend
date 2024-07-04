import { lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { createBrowserRouter, RouterProvider, useLocation, useParams } from 'react-router-dom';
import Logo from '../assets/pokemon-navbar.png';
import TabMenu from '../components/tabMenu/TabMenu';
import routes from '../routers/routes';
import './style.css';
import ResponsiveAppBar from '../components/appBar/AppBar';
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
