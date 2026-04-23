import databaseClient from "../../../services/database.js";

export default async function getOrders(req, res) {
  try {
    const orders = await databaseClient`
    SELECT * FROM orders`;

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during orders retrieval", error: error.message });
  }
}
