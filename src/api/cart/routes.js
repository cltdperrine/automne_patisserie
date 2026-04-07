import { Router } from "express";
import cartController from "./controllers/index.js";

const cartRouter = Router();

cartRouter.post("/", cartController.create);
cartRouter.get("/:id", cartController.get);
cartRouter.patch("/:id", cartController.patch);
cartRouter.delete("/", cartController.delete);

export default cartRouter;
