import type { DayForecast, ForecastItem, ForecastResponse } from "./types/weather";

export function groupForecastByDay(response: ForecastResponse): DayForecast[] {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const groups: Record<string, ForecastItem[]> = {};

  response.list.forEach((item) => {
    const dateKey = item.dt_txt.split(" ")[0];
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(item);
  });

  return Object.entries(groups).map(([date, items]) => {
    const isToday = date === todayStr;
    const dayDate = new Date(date + "T12:00:00");
    const rawDayName = dayDate.toLocaleDateString("fr-FR", { weekday: "long" });
    const dayName = isToday
      ? "Aujourd'hui"
      : rawDayName.charAt(0).toUpperCase() + rawDayName.slice(1);

    const temps = items.map((i) => i.main.temp);
    const midIndex = Math.floor(items.length / 2);

    return {
      date,
      dayName,
      items,
      minTemp: Math.round(Math.min(...temps)),
      maxTemp: Math.round(Math.max(...temps)),
      mainWeather: items[midIndex].weather[0],
    };
  });
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatHour(dtTxt: string): string {
  const date = new Date(dtTxt);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function latLonToTile(lat: number, lon: number, zoom: number) {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lon + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return { x, y };
}

export function windDegToDirection(deg: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  return directions[Math.round(deg / 45) % 8];
}

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
