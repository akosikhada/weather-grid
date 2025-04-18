import NavBar from "./components/NavBar";
import Temperature from "./components/temperature/Temperature";

export default function Home() {
  return (
    <main className="m-auto mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem]">
      <NavBar />
      <div className="flex flex-col gap-4 pb-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-[35rem]">
          <Temperature />
        </div>
        <div className="flex flex-col"></div>
      </div>
    </main>
  );
}
