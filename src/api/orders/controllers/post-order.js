import databaseClient from "../../../services/database.js";

export default async function createOrder(req, res) {
  const { client_id, status } = req.body;
  try {
    const result = await databaseClient`
    INSERT INTO orders (client_id, status) VALUES (${client_id}, ${status}) RETURNING *`;
    return res.status(200).send("Order created successfully");
  } catch (error) {
    console.error("Create category error:", error);
    return res.status(500).send({
      message: "Error during order creation",
      error: error.message,
    });
  }
}
