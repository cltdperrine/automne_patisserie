import { Router } from "express";
import ordersController from "./controllers/index.js";

const ordersRouter = Router();

ordersRouter.post("/", ordersController.create);
ordersRouter.get("/", ordersController.getAll);
ordersRouter.get("/:id", ordersController.get);
ordersRouter.patch("/:id", ordersController.patch);
ordersRouter.delete("/:id", ordersController.delete);

export default ordersRouter;
