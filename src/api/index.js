import categoriesRouter from "./categories/routes.js";
import productsRouter from "./products/routes.js";
import usersRouter from "./users/routes.js";
import { Router } from "express";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/categories", categoriesRouter);

export default apiRouter;
