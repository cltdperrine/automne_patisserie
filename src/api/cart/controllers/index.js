import clearCart from "./clear-cart.js";
import getCart from "./get-cart.js";
import addToCart from "./add-to-cart.js";
import removeFromCart from "./remove-from-cart.js";
import patchCartItem from "./patch-cart.js";

const cartController = {
  addToCart,
  getCart,
  patchCartItem,
  clearCart,
  removeFromCart,
};

export default cartController;
