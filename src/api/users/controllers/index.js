import deleteUser from "./delete-user.js";
import getUser from "./get-user.js";
import patchUser from "./patch-user.js";
import createUser from "./post-user.js";
import getUsers from "./get-users.js";

const usersController = {
  create: createUser,
  get: getUser,
  getAll: getUsers,
  delete: deleteUser,
  patch: patchUser,
};

export default usersController;
