import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pokemonReducer from './slices/pokemonSlice';
import actionReducer from './slices/actionSlice.js';

const combineReducer = combineReducers({
  pokemon: pokemonReducer,
  action: actionReducer
});

const persistConfig = {
  key: 'pokemon',
  storage,
  blacklist: ['action']
};

const combinedReducer = persistReducer(persistConfig, combineReducer);

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

store.subscribe(() => {
  console.log('Get State---------------', store.getState());
});

export const persistor = persistStore(store);
