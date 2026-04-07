import databaseClient from "../../../services/database.js";

export default async function deleteCart(req, res) {
  const { users_id, products_id } = req.body;

  try {
    const result = await databaseClient`
    DELETE FROM cart WHERE products_id = ${products_id} AND users_id = ${users_id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).send("Cart item not found");
    }
    return res.status(201).send("Cart deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during cart deletion", error.message);
  }
}
