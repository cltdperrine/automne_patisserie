import { Router } from "express";
import usersController from "./controllers/index.js";

const usersRouter = Router();

usersRouter.post("/", usersController.create);
usersRouter.get("/:id", usersController.get);
usersRouter.delete("/:id", usersController.delete);
usersRouter.patch("/:id", usersController.patch);

export default usersRouter;
