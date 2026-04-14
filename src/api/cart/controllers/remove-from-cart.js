import databaseClient from "../../../services/database.js";

export default async function removeFromCart(req, res) {
  const userId = Number.parseInt(req.params.user_id, 10);
  const productId = Number.parseInt(req.params.product_id, 10);

  if (Number.isNaN(userId) || userId < 1) {
    return res.status(400).send("Invalid user id");
  }
  if (Number.isNaN(productId) || productId < 1) {
    return res.status(400).send("Invalid product id");
  }

  try {
    const result = await databaseClient`
      DELETE FROM cart
      WHERE user_id = ${userId} AND product_id = ${productId}
      RETURNING *`;

    if (result.length === 0) {
      return res.status(404).send("Item not found in cart");
    }

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
