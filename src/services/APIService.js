import Axios from 'axios';
import _ from 'lodash';

const getListPokemon = async (callback) => {
  const listPokemonData = [];
  try {
    const response = await Axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    if (response.status === 200) {
      response.data.results.forEach((item, index) => {
        index++;
        const pokemonObject = {
          id: index,
          name: _.capitalize(item.name),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`
        };
        listPokemonData.push(pokemonObject);
      });
    }

    callback(listPokemonData);
  } catch (err) {
    callback(listPokemonData);
  }
};

const getSpeciesPokemon = async (id, callback) => {
  try {
    const [responseDetail1, responseDetail2] = await Promise.all([
      Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    ]);
    let pokemonObject = null;

    if (responseDetail1.status === 200 && responseDetail2.status === 200) {
      const data1 = responseDetail1.data;
      const data2 = responseDetail2.data;
      const desc = data1.flavor_text_entries.find((item) => item.language && item.language.name === 'en');
      const types = data2.types.map((item) => {
        return item.type.name;
      });

      pokemonObject = {
        id: data1.id,
        name: _.capitalize(data1.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        habitat: data1.habitat,
        desc: desc && desc.flavor_text ? desc.flavor_text : 'Unknown',
        weight: data2.weight,
        height: data2.height,
        types,
        stats: data2.stats
      };
    }

    callback(pokemonObject);
  } catch (err) {
    callback(null);
  }
};

const getListMyPokemon = async (callback) => {
  const listPokemonData = [];
  try {
    const response = await Axios.get('http://localhost:5000/api/pokemon/list-all');
    if (response.status === 200) {
      response.data.forEach((item) => {
        const specificID = item.id_pokemon.split('_')[0];
        const pokemonObject = {
          id: item.id_pokemon,
          name: _.capitalize(item.name_pokemon),
          nickName: _.capitalize(item.nickname_pokemon),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${specificID}.png`
        };
        listPokemonData.push(pokemonObject);
      });
    }

    callback(listPokemonData);
  } catch (err) {
    callback(listPokemonData);
  }
};

const catchPokemon = async (id, callback) => {
  let isCatchSuccess = false;
  try {
    const response = await Axios.post('http://localhost:5000/api/pokemon/catch', {
      id: `${id}`
    });
    if (response.status === 200) {
      isCatchSuccess = response.data.isCatchSuccess;
    }

    callback(isCatchSuccess);
  } catch (err) {
    callback(isCatchSuccess);
  }
};

const releasePokemon = async (id, callback) => {
  try {
    const response = await Axios.delete('http://localhost:5000/api/pokemon/release', {
      data: {
        id: `${id}`
      }
    });
    callback(response);
  } catch (err) {}
};

const renamePokemon = async (id, nickname, callback) => {
  try {
    const response = await Axios.put('http://localhost:5000/api/pokemon/rename', {
      id: `${id}`,
      nickname
    });
    callback(response);
  } catch (err) {}
};

export { getListPokemon, getSpeciesPokemon, getListMyPokemon, catchPokemon, releasePokemon, renamePokemon };
