import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    isUpdated: false
  },
  reducers: {
    addPokemon: (state, action) => {
      state.isUpdated = action.payload;
    }
  }
});

export const { addPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
