import deleteCategory from "./delete-category.js";
import getCategory from "./get-category.js";
import patchCategory from "./patch-category.js";
import createCategory from "./post-category.js";

const categoriesController = {
  create: createCategory,
  get: getCategory,
  patch: patchCategory,
  delete: deleteCategory,
};

export default categoriesController;
