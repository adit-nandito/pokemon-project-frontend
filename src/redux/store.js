import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pokemonReducer from './slices/pokemonSlice';

const persistConfig = {
  key: 'pokemon',
  storage
};

const persistedPokemonReducer = persistReducer(persistConfig, pokemonReducer);

export const store = configureStore({
  reducer: {
    pokemon: persistedPokemonReducer
  }
});

store.subscribe(() => {
  console.log('Get State---------------', store.getState());
});

export const persistor = persistStore(store);
