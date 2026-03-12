import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeatherProvider } from "./contexts/WeatherContext";
import Navbar from "./components/navbar/navbar";
import HomePage from "./pages/HomePage";
import MapsPage from "./pages/MapsPage";

export default function App() {
  return (
    <BrowserRouter>
      <WeatherProvider>
        <div className="min-h-screen w-full text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/maps" element={<MapsPage />} />
          </Routes>
        </div>
      </WeatherProvider>
    </BrowserRouter>
  );
}
