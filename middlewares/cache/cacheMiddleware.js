import { redisClient } from "../../app.js";

export const cacheMiddleware = (keyGenerator, ttl = 300) => {
  return async (req, res, next) => {
    const key = typeof keyGenerator === "function" ? keyGenerator(req) : keyGenerator;

    const cachedData = await redisClient.get(key);
    if (cachedData) {
      res.set("X-Cache", "hit");
      console.log("HIT");
      return res.json(
        JSON.parse(cachedData),
      );
    }
    res.set("X-Cache", "miss");

    const originalJson = res.json.bind(res);

    res.json = async (body) => {
      if (res.statusCode === 200) {
        await redisClient.setEx(key, ttl, JSON.stringify(body));
      }

      return originalJson(body);
    };

    next();
  };
};
