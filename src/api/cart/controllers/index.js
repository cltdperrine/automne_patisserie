import deleteCart from "./delete-cart.js";
import getCart from "./get-cart.js";
import patchCart from "./patch-cart.js";
import createCart from "./post-cart.js";

const cartController = {
  create: createCart,
  get: getCart,
  patch: patchCart,
  delete: deleteCart,
};

export default cartController;
