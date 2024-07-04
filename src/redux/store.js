import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer
  }
});

store.subscribe(() => {
  console.log('Get State---------------', store.getState());
});

export default store;
