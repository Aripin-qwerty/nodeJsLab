import env from "dotenv/config";

import { catchAsync } from "../../utils/catchAsync.js";
import { getCurrentWeatherBreaker } from "../../services/weatherService.js";

export const getCurrentweather = catchAsync(async (req, res) => {
  let { lat, lon } = req.query;

  const resWeather = await getCurrentWeatherBreaker(lat, lon); 

  return res.status(200).json({
    success: true,
    message: "Data weather fetched successfully",
    data: resWeather
  });
});
