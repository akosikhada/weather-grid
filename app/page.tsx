"use client";

import AirPollution from "./components/air-pollution/AirPollution";
import NavBar from "./components/NavBar";
import Sunset from "./components/sunset/Sunset";
import Temperature from "./components/temperature/Temperature";
import Wind from "./components/wind-compass/Wind";
import DailyForecast from "./components/daily-forecast/DailyForecast";
import UvIndex from "./components/uv-index/UvIndex";
import Population from "./components/population/Population";
import ApparentTemperature from "./components/apparent-temperature/ApparentTemperature";
import Humidity from "./components/humidity/Humidity";
import SightDistance from "./components/sight-distance/SightDistance";
import AtmosphericPressure from "./components/atmospheric-pressure/AtmosphericPressure";
import MapBox from "./components/map-box/MapBox";
import defaultStates from "./utils/default-states";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "./context/global-context";
import FiveDayForecast from "./components/five-day-forecast/FiveDayForeCast";

export default function Home() {
  const { setActiveCityCoords, fetchAllData } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords(lat, lon);
    fetchAllData();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="m-auto mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem]">
      <NavBar />
      <div className="flex flex-col gap-4 py-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex w-full flex-col">
          <div className="instruments sm-2:col-span-2 col-span-full grid h-full gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <ApparentTemperature />
            <Humidity />
            <SightDistance />
            <AtmosphericPressure />
          </div>
          <div className="map-box-container mt-4 flex gap-4">
            <MapBox />
            <div className="states flex flex-1 flex-col gap-3">
              <h2 className="flex items-center gap-2 font-medium">
                Other Large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="dark:bg-dark-grey cursor-pointer rounded-lg border shadow-sm dark:shadow-none"
                      onClick={() => {
                        getClickedCityCords(state.lat, state.lon);
                      }}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-4 border-t-2 py-4">
        <div className="flex flex-col items-center gap-4">
          <p className="max-w-2xl text-center text-[15px] leading-relaxed italic">
            "An advanced grid-based meteorological platform delivering precise
            weather analytics and forecasting with an intuitive, responsive
            interface."
          </p>
          <div className="flex items-center gap-2 text-[13px] font-medium">
            <span className="font-medium">
              © {new Date().getFullYear()} Weather Grid. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
