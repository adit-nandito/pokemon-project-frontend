import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpeciesPokemon } from '../services/APIService';
import PokemonDetail from '../components/Elements/PokemonDetail/PokemonDetail';

const PokemonDetailPage = () => {
  const { id } = useParams();
  const [pokeDetailState, pokeDetailSetState] = useState();
  useEffect(() => {
    getSpeciesPokemon(id, (data) => {
      pokeDetailSetState(data);
    });
  }, []);

  return pokeDetailState ? <PokemonDetail detail={pokeDetailState} /> : '';
};

export default PokemonDetailPage;
