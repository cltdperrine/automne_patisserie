import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./api/index.js";
dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", apiRouter);

app.get("/health", (req, res) => {
  return res.status(200).send("Hello world!");
});

export default app;
