import getCart from "./get-cart.js";
import createCart from "./post-cart.js";

const cartController = {
  create: createCart,
  get: getCart,
};

export default cartController;
