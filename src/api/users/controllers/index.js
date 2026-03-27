import deleteUser from "./delete-user.js";
import getUser from "./get-user.js";
import patchUser from "./patch-user.js";
import createUser from "./post-user.js";

const usersController = {
  create: createUser,
  get: getUser,
  delete: deleteUser,
  patch: patchUser,
};

export default usersController;
