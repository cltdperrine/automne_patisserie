import databaseClient from "../../../services/database.js";

export default async function clearCart(req, res) {
  const { user_id } = req.params;

  try {
    const result = await databaseClient`
    DELETE FROM cart WHERE user_id = ${user_id} RETURNING *`;

    return res.status(200).send("Cart cleared");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
