import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function patchOrder(req, res) {
  const id = req.params.id;
  const { client_id, status } = req.body;

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid order id");
  }

  if (client_id !== undefined && !isValidUUID(client_id)) {
    return res.status(400).send("Invalid client id");
  }

  if (client_id === undefined && status === undefined) {
    return res.status(400).send("No data to update");
  }

  try {
    let result;

    if (client_id !== undefined && status !== undefined) {
      result = await databaseClient`
        UPDATE orders SET client_id = ${client_id}, status = ${status} WHERE id = ${id} RETURNING *`;
    } else if (client_id !== undefined) {
      result = await databaseClient`
        UPDATE orders SET client_id = ${client_id} WHERE id = ${id} RETURNING *`;
    } else {
      result = await databaseClient`
        UPDATE orders SET status = ${status} WHERE id = ${id} RETURNING *`;
    }

    if (!result[0]) {
      return res.status(404).send("Order not found");
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during order update", error: error.message });
  }
}
