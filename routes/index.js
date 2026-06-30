import express from "express";
import { homePageHandler } from "../controllers/indexController.js";

export const indexRouter = express.Router();

/* GET home page. */

indexRouter.get("/", homePageHandler);

indexRouter.get("/session/1", (req, res) => {
  console.log("SESSION:", req.session);
  console.log("SESSION ID:", req.sessionID);

  res.send("session check");
});

indexRouter.get("/getfibonacci", (req, res) => {
  const startTime = new Date();
  const result = fibonacci(parseInt(req.query.number)); //parseInt is for converting string to number
  const endTime = new Date();
  res.json({
    number: parseInt(req.query.number),
    fibonacci: result,
    time: endTime.getTime() - startTime.getTime() + "ms",
  });
});

const fibonacci = (n) => {
  if (n <= 1) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

indexRouter.get("/session/4", (req, res) => {
  console.log("SESSION FINAL:", req.session);

  res.send(req.session);
});

indexRouter.get("/redis-test", (req, res) => {
  req.session.test = Date.now();
  res.send(req.session);
});


