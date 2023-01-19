import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';

enum constant {
  DEFAULT_BG_COLOR = 'white',
}
type backGr = {
  backGrColor: string;
};
const initialState: backGr = {
  backGrColor: constant.DEFAULT_BG_COLOR,
};

export const bgColorSlice = createSlice({
  name: 'bgContainerLayout',
  initialState,
  reducers: {
    setBgColor: (state, action) => {
      state.backGrColor = action.payload;
    },
  },
});

export const { setBgColor } = bgColorSlice.actions;
export default bgColorSlice.reducer;
