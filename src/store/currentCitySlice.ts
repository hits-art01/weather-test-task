import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface City {
  name: string;
  img: string;
}

interface CurrentCityState {
  city: City | null;
}

const initialState: CurrentCityState = {
  city: null,
};

const currentCitySlice = createSlice({
  name: "currentCity",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    clearCity: (state) => {
      state.city = null;
    },
  },
});

export const { setCity, clearCity } = currentCitySlice.actions;
export default currentCitySlice.reducer;
