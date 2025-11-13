"use client";

import React, { FC } from "react";
import CityCover from "./CityCover";
import { City, removeCity } from "../../store/citiesSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCity } from "@/store/currentCitySlice";

export interface WeatherData {
  main: { temp: number };
  weather: { description: string; icon: string }[];
  name: string;
}

interface CityCardProps {
  city: City;
  weather?: WeatherData;
  isLoading?: boolean;
  error?: unknown;
  refresh: () => void;
}

const CityCard: FC<CityCardProps> = ({
  city,
  weather,
  isLoading,
  error,
  refresh,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeCity(city.name));
  };
  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    refresh();
  };

  const handleCardClick = () => {
    router.push(`/${city.name}`);
    dispatch(setCity(city));
  };

  const hasWeatherData =
    weather?.main !== undefined && weather?.weather?.length > 0;

  return (
    <div className="city-card" onClick={handleCardClick}>
      <CityCover image={city.img} />
      <div className="city-card__details">
        <span className="city-card__title">{city.name}</span>

        <div className="city-card__info">
          {isLoading && <p>Loading...</p>}

          {hasWeatherData ? (
            <div className="city-card__data">
              <div className="city-card__temp">
                <p>{weather!.main.temp}°C</p>
                <p>{weather!.weather[0].description}</p>
              </div>
              <div className="city-card__weather-icon">
                <Image
                  src={`https://openweathermap.org/img/wn/${
                    weather!.weather[0].icon
                  }@2x.png`}
                  alt={weather!.weather[0].description}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          ) : (
            !isLoading && <p>No data</p>
          )}

          <div className="city-card__btns">
            <button className="city-card__remove" onClick={handleRemove}>
              ❌
            </button>

            <button
              className="city-card__refresh"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              ↺
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
