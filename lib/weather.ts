// lib/weather.ts

export interface Coordinates {
  lat: number;
  lon: number;
  display_name: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface DailyForecast {
  date: string;
  temperature_max: number;
  temperature_min: number;
  precipitation: number;
  windspeed_max: number;
  sunrise: string;
  sunset: string;
  weathercode: number;
  uv_index_max?: number;
  apparent_temperature_max?: number;
  apparent_temperature_min?: number;
}

export interface WeatherData {
  place: string;
  latitude: number;
  longitude: number;
  current: CurrentWeather | null;
  forecast: DailyForecast[] | null;
}

// 1. Get coordinates from place name using OpenStreetMap Nominatim
export async function getCoordinates(placeName: string): Promise<Coordinates | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`
    );
    const data = await response.json();
    if (!data || data.length === 0) return null;

    const { lat, lon, display_name } = data[0];
    return { lat: parseFloat(lat), lon: parseFloat(lon), display_name };
  } catch (err) {
    console.error("Error fetching coordinates:", err);
    return null;
  }
}

// 2. Get current weather from coordinates using Open-Meteo
export async function getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather | null> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const data = await response.json();
    return data.current_weather || null;
  } catch (err) {
    console.error("Error fetching current weather:", err);
    return null;
  }
}

// 3. Get 7-day forecast from coordinates using Open-Meteo
export async function get7DayForecast(lat: number, lon: number): Promise<DailyForecast[] | null> {
  try {
    const dailyParams = [
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "precipitation_sum",
      "windspeed_10m_max",
      "sunrise",
      "sunset",
      "weathercode",
      "uv_index_max"
    ].join(",");

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=${dailyParams}&timezone=auto`
    );
    const data = await response.json();

    if (!data.daily) return null;

    // Build forecast array
    const forecast: DailyForecast[] = data.daily.time.map((date: string, index: number) => ({
      date,
      temperature_max: data.daily.temperature_2m_max[index],
      temperature_min: data.daily.temperature_2m_min[index],
      apparent_temperature_max: data.daily.apparent_temperature_max[index],
      apparent_temperature_min: data.daily.apparent_temperature_min[index],
      precipitation: data.daily.precipitation_sum[index],
      windspeed_max: data.daily.windspeed_10m_max[index],
      sunrise: data.daily.sunrise[index],
      sunset: data.daily.sunset[index],
      weathercode: data.daily.weathercode[index],
      uv_index_max: data.daily.uv_index_max[index],
    }));

    return forecast;
  } catch (err) {
    console.error("Error fetching 7-day forecast:", err);
    return null;
  }
}

// 4. Combined function: Get current weather + 7-day forecast by place name
export async function getWeatherByPlace(placeName: string): Promise<WeatherData | null> {
  const coords = await getCoordinates(placeName);
  if (!coords) return null;

  const current = await getCurrentWeather(coords.lat, coords.lon);
  const forecast = await get7DayForecast(coords.lat, coords.lon);

  return {
    place: coords.display_name,
    latitude: coords.lat,
    longitude: coords.lon,
    current,
    forecast,
  };
}
