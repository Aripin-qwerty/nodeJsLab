import env from "dotenv/config";

import { httpClient } from "../clients/httpClient.js";
import { createCircuitBreaker } from "../clients/circuitBreaker.js";


const fetchNews = async (size = 1) => {
  const newsData = await httpClient.get(
    `https://newsdata.io/api/1/latest?apikey=${process.env.NEWSDATAIO_APP_ID}&country=id&language=id&timezone=asia/jakarta&image=1&removeduplicate=1&size=${size}`,
  );
  return newsData.data.results;
};

const breakerNews = createCircuitBreaker(fetchNews(6));

export const getNewsBreaker = (size) => {
  return breakerNews.fire(size);  
}




