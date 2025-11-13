// src/store/citiesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";

export interface City {
  name: string;
  img: string;
}

interface CitiesState {
  cities: City[];
}

const initialState: CitiesState = {
  cities: [
    { name: "Kyiv", img: "/assets/cityimg.jpg" },
    { name: "London", img: "/assets/cityimg.jpg" },
    { name: "Paris", img: "/assets/cityimg.jpg" },
    { name: "Berlin", img: "/assets/cityimg.jpg" },
    { name: "Rome", img: "/assets/cityimg.jpg" },
    { name: "Madrid", img: "/assets/cityimg.jpg" },
    { name: "Warsaw", img: "/assets/cityimg.jpg" },
    { name: "Prague", img: "/assets/cityimg.jpg" },
    { name: "New York", img: "/assets/cityimg.jpg" },
    { name: "Tokyo", img: "/assets/cityimg.jpg" },
  ],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
      try {
        localStorage.setItem("cities", JSON.stringify(state.cities));
      } catch {}
    },
    addCity: (state, action: PayloadAction<string>) => {
      const exists = state.cities.some(
        (c) => c.name.toLowerCase() === action.payload.toLowerCase()
      );
      if (!exists) {
        state.cities.push({
          name: action.payload,
          img: "assets/cityimg.jpg",
        });
      }
      try {
        localStorage.setItem("cities", JSON.stringify(state.cities));
      } catch {}
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(
        (city) => city.name.toLowerCase() !== action.payload.toLowerCase()
      );
      try {
        localStorage.setItem("cities", JSON.stringify(state.cities));
      } catch {}
    },
  },
});

export const { addCity, removeCity, setCities } = citiesSlice.actions;
export default citiesSlice.reducer;
