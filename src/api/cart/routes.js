import { Router } from "express";
import cartController from "./controllers/index.js";

const cartRouter = Router();

cartRouter.post("/", cartController.create);
cartRouter.get("/:id", cartController.get);
cartRouter.patch("/:product_id/:user_id", cartController.patch);
cartRouter.delete("/:product_id/:user_id", cartController.delete);

export default cartRouter;
