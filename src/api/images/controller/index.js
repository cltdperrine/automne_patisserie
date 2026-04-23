import deleteImage from "./delete-image.js";
import getImage from "./get-image.js";
import getImages from "./get-images.js";
import patchImage from "./patch-image.js";
import createImage from "./post-image.js";

const imagesController = {
  create: createImage,
  getAll: getImages,
  get: getImage,
  patch: patchImage,
  delete: deleteImage,
};

export default imagesController;
