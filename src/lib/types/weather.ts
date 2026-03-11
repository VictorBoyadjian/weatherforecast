export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherCondition[];
  clouds: { all: number };
  wind: { speed: number; deg: number; gust: number };
  visibility: number;
  pop: number;
  rain?: { "3h": number };
  snow?: { "3h": number };
  sys: { pod: string };
  dt_txt: string;
};

export type CityInfo = {
  id: number;
  name: string;
  coord: { lat: number; lon: number };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type ForecastResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: CityInfo;
};

export type GeocodingResult = {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type DayForecast = {
  date: string;
  dayName: string;
  items: ForecastItem[];
  minTemp: number;
  maxTemp: number;
  mainWeather: WeatherCondition;
};

export type MapLayer =
  | "clouds_new"
  | "precipitation_new"
  | "pressure_new"
  | "wind_new"
  | "temp_new";
