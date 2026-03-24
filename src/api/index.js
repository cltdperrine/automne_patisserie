import usersRouter from "./users/routes.js";
import { Router } from "express";

const apiRouter = Router();

apiRouter.use("/users", usersRouter)

export default apiRouter;