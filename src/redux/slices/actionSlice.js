import { createSlice } from '@reduxjs/toolkit';

const actionSlice = createSlice({
  name: 'action',
  initialState: {
    isShowPopupGetPokeball: false
  },
  reducers: {
    setShowPopupGetPokeball: (state, action) => {
      state.isShowPopupGetPokeball = action.payload;
    }
  }
});

export const { setShowPopupGetPokeball } = actionSlice.actions;
export default actionSlice.reducer;
