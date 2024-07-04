import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    listCatchablePokemon: [],
    listRarePokemon: [],
    page: 'main'
  },
  reducers: {
    setCatchablePokemon: (state, action) => {
      if (_.isEmpty(state.listCatchablePokemon)) {
        state.listCatchablePokemon.push(...action.payload);
      }
    },
    setRarePokemon: (state, action) => {
      if (_.isEmpty(state.listRarePokemon)) {
        state.listRarePokemon.push(...action.payload);
      }
    },
    setPage: (state, action) => {
      state.page = action.payload;
    }
  }
});

export const { setCatchablePokemon, setRarePokemon, setPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;
