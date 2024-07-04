import Axios from 'axios';
import _ from 'lodash';
import STATIC_URL from '../utils/url';

// const getListPokemon = async (callback) => {
//   try {
//     const response = await Axios.get(`${STATIC_URL.localhost}/list-all`);
//     callback(null, response.data);
//   } catch (err) {
//     callback(err);
//   }
// };

const getListPokemon = async () => {
  try {
    const response = await Axios.get(`${STATIC_URL.localhost}/list-all`);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// const getDetailPokemon = async (name, callback) => {
//   try {
//     const response = await Axios.get(`${STATIC_URL.localhost}/detail`, {
//       params: {
//         name
//       }
//     });

//     callback(null, response.data);
//   } catch (err) {
//     callback(err);
//   }
// };

const getDetailPokemon = async (props) => {
  const { name } = props.params;
  try {
    const response = await Axios.get(`${STATIC_URL.localhost}/detail`, {
      params: {
        name
      }
    });

    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getListMyPokemon = async (callback) => {
  const listPokemonData = [];
  try {
    const response = await Axios.get(`${STATIC_URL.localhost}/mypokemon`);
    if (response.status === 200) {
      response.data.forEach((item) => {
        const specificID = item.id_pokemon.split('_')[0];
        const pokemonObject = {
          id: item.id_pokemon,
          name: _.capitalize(item.name_pokemon),
          nickName: _.capitalize(item.nickname_pokemon),
          image: `${STATIC_URL.imageURL}/${specificID}.png`
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
    const response = await Axios.post(`${STATIC_URL.localhost}/catch`, {
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
    const response = await Axios.delete(`${STATIC_URL.localhost}/release`, {
      data: {
        id: `${id}`
      }
    });
    callback(response);
  } catch (err) {
    callback(err);
  }
};

const renamePokemon = async (id, nickname, callback) => {
  try {
    const response = await Axios.put(`${STATIC_URL.localhost}/rename`, {
      id: `${id}`,
      nickname
    });
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export { getListPokemon, getDetailPokemon, getListMyPokemon, catchPokemon, releasePokemon, renamePokemon };
