import databaseClient from "../../../services/database.js";

export default async function deleteCart(req, res) {
  const { user_id, product_id } = req.params;

  try {
    const result = await databaseClient`
    DELETE FROM cart WHERE product_id = ${product_id} AND user_id = ${user_id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).send("Cart item not found");
    }
    return res.status(201).send("Cart deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during cart deletion", error.message);
  }
}
