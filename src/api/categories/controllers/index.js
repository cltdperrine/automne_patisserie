import createProduct from "../../products/controllers/post-product.js";
import createCategory from "./post-category.js";

const categoriesController = {
  create: createCategory,
};

export default categoriesController;
