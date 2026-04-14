import { Router } from "express";
import cartController from "./controllers/index.js";

const cartRouter = Router();

cartRouter.post("/:user_id/cart", cartController.addToCart);
cartRouter.get("/:user_id/cart", cartController.getCart);
cartRouter.patch(
  "/:user_id/cart/:product_id",
  cartController.patchCartItem,
);
cartRouter.delete("/:user_id/cart", cartController.clearCart);
cartRouter.delete(
  "/:user_id/cart/:product_id",
  cartController.removeFromCart,
);

export default cartRouter;
