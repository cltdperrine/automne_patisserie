import { Router } from "express";
import cartController from "./controllers/index.js";

const cartRouter = Router();

cartRouter.post("/users/:user_id/cart", cartController.addToCart);
cartRouter.get("/users/:user_id/cart", cartController.getCart);
cartRouter.patch("/users/:user_id/cart/:product_id", cartController.patchCartItem);
cartRouter.delete("/users/:user_id/cart", cartController.clearCart);
cartRouter.delete(
  "/users/:user_id/cart/:product_id",
  cartController.removeFromCart,
);

export default cartRouter;
