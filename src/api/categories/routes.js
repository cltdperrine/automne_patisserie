import { Router } from "express";
import categoriesController from "./controllers/index.js";

const categoriesRouter = Router();

categoriesRouter.post("/", categoriesController.create);

export default categoriesRouter;
