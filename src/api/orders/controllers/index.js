import deleteOrder from "./delete-order.js";
import getOrder from "./get-order.js";
import patchOrder from "./patch-order.js";
import createOrder from "./post-order.js";

const ordersController = {
  create: createOrder,
  get: getOrder,
  patch: patchOrder,
  delete: deleteOrder,
};

export default ordersController;
