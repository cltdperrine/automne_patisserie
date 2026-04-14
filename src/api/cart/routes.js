import { Router } from "express";
import cartController from "./controllers/index.js";

const cartRouter = Router();

<<<<<<< Updated upstream
cartRouter.post("/", cartController.create);
cartRouter.get("/:id", cartController.get);
cartRouter.patch("/:products_id/:users_id", cartController.patch);
cartRouter.delete("/", cartController.delete);
=======
cartRouter.post("/:user_id/cart", cartController.addToCart);
cartRouter.get("/:user_id/cart", cartController.getCart);
cartRouter.delete("/:user_id/cart", cartController.clearCart);
cartRouter.delete("/:user_id/cart/:product_id", cartController.removeFromCart);
>>>>>>> Stashed changes

export default cartRouter;
