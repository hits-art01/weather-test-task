"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCity, setCity } from "@/store/currentCitySlice";
import { RootState } from "@/store/store";

export default function ClientProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.cities.cities);
  const currentCity = useSelector((state: RootState) => state.currentCity.city);

  useEffect(() => {
    const saved = localStorage.getItem("currentCity");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!cities.find((c) => c.name === parsed.name)) {
          dispatch(clearCity());
          localStorage.removeItem("currentCity");
        } else {
          dispatch(setCity(parsed));
        }
      } catch (e) {
        console.error("Error parsing currentCity from localStorage", e);
        localStorage.removeItem("currentCity");
      }
    }
  }, [cities, dispatch]);

  useEffect(() => {
    if (currentCity) {
      localStorage.setItem("currentCity", JSON.stringify(currentCity));
    }
  }, [currentCity]);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
