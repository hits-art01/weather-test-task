"use client";
import React, { FC, useEffect } from "react";
import { City, setCities } from "../../store/citiesSlice";
import CityCard from "../City-card/CityCard";
import "./cities-list.scss";
import { useQueries } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";

const API_KEY = "374d5910d770e6beabc7e3dc2b5dcd60";

const CitiesList: FC = () => {
  const cities = useSelector((state: RootState) => state.cities.cities);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCities = localStorage.getItem("cities");
    if (savedCities) {
      try {
        const parsedCities: City[] = JSON.parse(savedCities);
        dispatch(setCities(parsedCities));
      } catch (e) {
        console.error("Error:", e);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const weatherQueries = useQueries({
    queries: cities.map((city) => ({
      queryKey: ["weather", city.name],
      queryFn: () =>
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`
          )
          .then((res) => res.data),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
    })),
  });
  return (
    <div className="cities-list">
      {cities.map((city: City, index) => (
        <CityCard
          city={city}
          key={city.name}
          weather={weatherQueries[index]?.data}
          isLoading={weatherQueries[index]?.isFetching}
          error={weatherQueries[index]?.error}
          refresh={weatherQueries[index]?.refetch}
        />
      ))}
    </div>
  );
};

export default CitiesList;
