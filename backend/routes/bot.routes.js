import express, { Router } from "express";
import { askbot } from "../utils/askbot.js";

// import { get_weather_forecast } from "../utils/weather.js";

const askRoute = express.Router();
askRoute.post("/", askbot);
// askRoute.post("/weather", get_weather_forecast);
// askRoute.post("/generate-app", getcode);

export default askRoute;