import express from 'express';

import { getCurrentweather } from '../../controllers/api/weatherControllerApi.js';
import { cacheMiddleware } from '../../middlewares/cache/cacheMiddleware.js';
import { generatorKeyWeather } from '../../services/weatherService.js';

export const weatherRouter = express.Router();

weatherRouter.get("/weather", cacheMiddleware(generatorKeyWeather), getCurrentweather); 