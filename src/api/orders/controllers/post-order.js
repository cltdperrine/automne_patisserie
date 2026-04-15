import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function createOrder(req, res) {
  const { client_id, status } = req.body;

  if (!client_id || !status) {
    return res.status(400).send("client_id and status are required");
  }

  if (!isValidUUID(client_id)) {
    return res.status(400).send("Invalid category id");
  }

  try {
    const result = await databaseClient`
    INSERT INTO orders (client_id, status) VALUES (${client_id}, ${status}) RETURNING *`;

    return res.status(201).json(result[0]);
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      message: "Error during order creation",
      error: error.message,
    });
  }
}
