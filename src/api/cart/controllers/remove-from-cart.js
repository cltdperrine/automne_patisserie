import databaseClient from "../../../services/database.js";

export default async function removeFromCart(req, res) {
  const { user_id, product_id } = req.params;

  if (!user_id || !product_id) {
    return res.status(400).send("Missing parameters");
  }

  try {
    const result = await databaseClient`
    DELETE FROM cart WHERE user_id = ${user_id} AND product_id = ${product_id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).send("Item not found in cart");
    }

    return res.status(204).send("Item removed from cart");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
