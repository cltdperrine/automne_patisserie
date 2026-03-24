import { Router } from "express";
import usersController from "./controllers/index.js";

const usersRouter = Router()

usersRouter.post("/", usersController.create)

export default usersRouter;