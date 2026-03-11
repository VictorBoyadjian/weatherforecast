import "./App.css";
import { WeatherProvider } from "./contexts/WeatherContext";
import Navbar from "./components/navbar/navbar";
import CurrentWeatherCard from "./components/current-weather/CurrentWeatherCard";
import DailyForecast from "./components/forecast/DailyForecast";
import ChartsSection from "./components/charts/ChartsSection";
import WeatherMap from "./components/weather-map/WeatherMap";

export default function App() {
  return (
    <WeatherProvider>
      <div className="bg-gray-950 min-h-screen w-full text-white">
        <Navbar />
        <main className="max-w-screen-2xl mx-auto p-4 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-80 shrink-0">
              <CurrentWeatherCard />
            </div>
            <div className="flex-1 min-w-0">
              <DailyForecast />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/3">
              <WeatherMap />
            </div>
            <div className="lg:w-2/3">
              <ChartsSection />
            </div>
          </div>
        </main>
      </div>
    </WeatherProvider>
  );
}
