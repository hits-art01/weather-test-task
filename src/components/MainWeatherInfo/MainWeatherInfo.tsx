"use client";

import React, { FC, useEffect } from "react";
import "./main-weather-info.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setCity } from "@/store/currentCitySlice"; // <- правильный импорт
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface HourlyWeather {
  hour: string;
  temp: number;
}

interface OpenWeatherForecastItem {
  dt: number;
  main: { temp: number };
}

const API_KEY = "374d5910d770e6beabc7e3dc2b5dcd60";

const fetchWeather = async (cityName: string): Promise<HourlyWeather[]> => {
  const res = await axios.get<{ list: OpenWeatherForecastItem[] }>(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
  );

  const list = res.data.list;
  if (!Array.isArray(list)) throw new Error("Invalid API response");

  return list.slice(0, 8).map((item) => {
    const date = new Date(item.dt * 1000);
    return { hour: `${date.getHours()}:00`, temp: Math.round(item.main.temp) };
  });
};

const MainWeatherInfo: FC = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const city = useSelector((state: RootState) => state.currentCity.city);
  const cityName = city?.name;

  // Восстанавливаем город из localStorage
  useEffect(() => {
    const savedCity = localStorage.getItem("currentCity");
    if (savedCity) {
      try {
        dispatch(setCity(JSON.parse(savedCity)));
      } catch (e) {
        console.error("Error parsing saved city", e);
      }
    }
  }, [dispatch]);

  // Сохраняем выбранный город в localStorage при изменении
  useEffect(() => {
    if (city) {
      localStorage.setItem("currentCity", JSON.stringify(city));
      console.log(city);
    }
  }, [city]);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<
    HourlyWeather[],
    Error
  >({
    queryKey: ["weather", cityName],
    queryFn: () => fetchWeather(cityName!),
    enabled: !!city,
    staleTime: 0,
  });

  const chartData = Array.isArray(data) ? data : [];

  if (!city) return <p>Please select a city</p>;
  if (isLoading || isFetching) return <p>Loading weather for {cityName}...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
  if (chartData.length === 0) return <p>No weather data</p>;

  return (
    <div className="main-weather-info">
      <h2>24-hour forecast for {cityName}</h2>

      <button
        onClick={() => {
          if (cityName) {
            queryClient.invalidateQueries({ queryKey: ["weather", cityName] });
          }
        }}
        className="main-weather-info__refresh"
      >
        Refresh
      </button>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MainWeatherInfo;
