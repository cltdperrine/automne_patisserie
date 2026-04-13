import databaseClient from "../../../services/database.js";

export default async function deleteOrder(req, res) {
  const { id } = req.params;

  try {
    const result = await databaseClient`
    DELETE FROM orders WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).send("order not found");
    }
    return res.status(200).send("Order deleted");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error during order deletion", error: error.message });
  }
}
