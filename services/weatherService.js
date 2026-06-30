import env from "dotenv/config";
import geohash from "ngeohash";

import { httpClient } from "../clients/httpClient.js";
import { createCircuitBreaker } from "../clients/circuitBreaker.js";
import { coordinateParser } from "../utils/coordinateParser.js";

const fetchWeather = async (lat, lon) => {
    const weatherData = await httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_APP_ID}`,
    );
  return weatherData.data;
};

const breakerWeather = createCircuitBreaker(fetchWeather);

export const getCurrentWeatherBreaker = (lat, lon) => {
  return breakerWeather.fire(lat, lon);
}

export const generatorKeyWeather = (req) => {
  let { lat, lon } = req.query;
  if (!lat || !lon) {
    throw new AppError("Lattitude and longitude is required", 400);
  };

  lat = coordinateParser(lat);
  lon = coordinateParser(lon);

  return "weather:" + geohash.encode(lat, lon);
}


