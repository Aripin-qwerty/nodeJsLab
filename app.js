import createError from "http-errors";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";
import { RedisStore } from "connect-redis";
import {createClient} from "redis";
import methodOverride from "method-override";
import dev from "dotenv/config";

import { indexRouter } from "./routes/index.js";
import { usersRouter } from "./routes/user.js";
import { authRouter } from "./routes/auth.js";
import { weatherRouter } from "./routes/api/weatherRouteApi.js";
import { apiErrorHandler } from "./middlewares/apiErrorhandler.js";
import { webErrorHandler } from "./middlewares/webErrorhandler.js";
import { newsRouter } from "./routes/api/newsRouteApi.js";

export const app = express();

// view engine setup
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.set("layout", "layouts/auth");

const redisConn = () => {
  return createClient({
    url: "redis://localhost:6379",
  });
};
export const redisClient = redisConn();
await redisClient.connect();

app.use(cookieParser());
app.use(
  session({
    store: new RedisStore({
      client: redisClient
    }),
    name: "sid",
    secret: process.env.SECRET_COOKIE,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    }
  }),
);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.static(path.join(process.cwd(), "node_modules")));
// Route to serve Leaflet's static file
app.use("/leaflet",express.static(path.join(process.cwd(), "node_modules/leaflet/dist")));
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/auth", authRouter);
app.use("/api", weatherRouter, newsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return next(createError(404));
});

// app.use(function (err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
//   }

//   console.error(err);
//   // render the error page
//   res.status(err.status || 500);
//   return res.render("error", {
//     title: "Error",
//     errorMessage: [
//       { 
//         statusCode: err.status,
//         message: err.message,
//       },
//     ],
//   });
// });

// Error Api Handler
app.use(apiErrorHandler);
// Error Web Handler
app.use(webErrorHandler);