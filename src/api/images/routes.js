import { Router } from "express";
import imagesController from "./controller/index.js";

const imagesRouter = Router();

imagesRouter.post("/", imagesController.create);
imagesRouter.get("/", imagesController.getAll);
imagesRouter.get("/:id", imagesController.get);
imagesRouter.patch("/:id", imagesController.patch);
imagesRouter.delete("/:id", imagesController.delete);

export default imagesRouter;
