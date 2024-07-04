import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    listCatchablePokemon: [],
    listSecretPokemon: [],
    page: 'main'
  },
  reducers: {
    setCatchablePokemon: (state, action) => {
      if (_.isEmpty(state.listCatchablePokemon)) {
        state.listCatchablePokemon.push(...action.payload);
      }
    },
    setSecretPokemon: (state, action) => {
      if (_.isEmpty(state.listSecretPokemon)) {
        state.listSecretPokemon.push(...action.payload);
      }
    }
  }
});

export const { setCatchablePokemon, setSecretPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
