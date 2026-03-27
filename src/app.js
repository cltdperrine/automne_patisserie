import express from "express";
import dotenv from "dotenv";
import apiRouter from "./api/index.js";
import getUser from "./api/users/controllers/get-user.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

app.get("/health", (req, res) => {
  return res.status(200).send("Hello world!");
});

export default app;
