import databaseClient from "../../../services/database.js";

export default async function patchOrder(req, res) {
  const id = parseInt(req.params.id);
  const { client_id, status } = req.body;

  try {
    if (client_id === undefined && status === undefined) {
      return res.status(400).send("No data to update");
    }

    let result;
    if (client_id !== undefined && status !== undefined) {
      result = await databaseClient`
        UPDATE orders SET client_id = ${client_id}, status = ${status} WHERE id = ${id} RETURNING *`;
    } else if (client_id !== undefined) {
      result = await databaseClient`
        UPDATE orders SET client_id = ${client_id} WHERE id = ${id} RETURNING *`;
    } else if (status !== undefined) {
      result = await databaseClient`
        UPDATE orders SET status = ${status} WHERE id = ${id} RETURNING *`;
    }

    if (!result[0]) {
      return res.status(404).send("Order not found");
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during category update", error.message);
  }
}
