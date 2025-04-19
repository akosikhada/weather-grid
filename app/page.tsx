import AirPollution from "./components/air-pollution/AirPollution";
import NavBar from "./components/NavBar";
import Sunset from "./components/sunset/Sunset";
import Temperature from "./components/temperature/Temperature";
import Wind from "./components/wind-compass/Wind";

export default function Home() {
  return (
    <main className="m-auto mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem]">
      <NavBar />
      <div className="flex flex-col gap-4 pb-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-[35rem]">
          <Temperature />
        </div>
        <div className="flex w-full flex-col">
          <div className="instruments sm-2:col-span-2 col-span-full grid h-full gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
          </div>
        </div>
      </div>
    </main>
  );
}
