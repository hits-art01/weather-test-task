import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./citiesSlice";
import currentCityReducer from "./currentCitySlice";

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    currentCity: currentCityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
