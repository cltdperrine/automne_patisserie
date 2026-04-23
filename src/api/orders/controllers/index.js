import deleteOrder from "./delete-order.js";
import getOrder from "./get-order.js";
import getOrders from "./get-orders.js";
import patchOrder from "./patch-order.js";
import createOrder from "./post-order.js";

const ordersController = {
  create: createOrder,
  getAll: getOrders,
  get: getOrder,
  patch: patchOrder,
  delete: deleteOrder,
};

export default ordersController;
