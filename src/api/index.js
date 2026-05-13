import authRouter from "./auth/routes.js";
import cartRouter from "./cart/routes.js";
import categoriesRouter from "./categories/routes.js";
import imagesRouter from "./images/routes.js";
import ordersRouter from "./orders/routes.js";
import productsRouter from "./products/routes.js";
import usersRouter from "./users/routes.js";
import { Router } from "express";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/images", imagesRouter);
apiRouter.use("/", cartRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
