import getProduct from "./get-product.js";
import createProduct from "./post-product.js";
import patchProduct from "./patch-product.js";
import deleteProduct from "./delete-product.js";

const productsController = {
  create: createProduct,
  get: getProduct,
  patch: patchProduct,
  delete: deleteProduct,
};

export default productsController;
