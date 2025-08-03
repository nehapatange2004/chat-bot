import express from "express";
import dotenv from "dotenv"
import cors from "cors";
dotenv.config();
import {askbot} from "./utils/askbot.js"
// import { GoogleGenAI } from "@google/genai";
import askRoute from "./routes/bot.routes.js";
const app = express();

// app.post("/", askbot);
app.use(cors());
app.use(express.json());
app.use("/api/askbot", askRoute)
app.listen(process.env.PORT, () => {
    console.log(`App listening at port: ${process.env.PORT}`)
})