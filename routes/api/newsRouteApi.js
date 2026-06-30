import express from "express";
import { getNews } from "../../controllers/api/newsControllerApi.js";
import { cacheMiddleware } from "../../middlewares/cache/cacheMiddleware.js";

export const newsRouter = express.Router();

newsRouter.get("/news", cacheMiddleware("news"), getNews);
