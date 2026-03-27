import { Router } from "express";
import productsController from "./controllers/index.js";

const productsRouter = Router();

productsRouter.post("/", productsController.create);
productsRouter.get("/:id", productsController.get);
productsRouter.patch("/:id", productsController.patch);
productsRouter.delete("/:id", productsController.delete);

export default productsRouter;
