import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function deleteOrder(req, res) {
  const { id } = req.params;

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid category id");
  }

  try {
    const result = await databaseClient`
    DELETE FROM orders 
    WHERE id = ${id} 
    RETURNING *`;

    if (result.length === 0) {
      return res.status(404).send("Order not found");
    }
    return res.status(200).send("Order deleted");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during order deletion", error: error.message });
  }
}
