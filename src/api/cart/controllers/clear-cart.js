import databaseClient from "../../../services/database.js";

export default async function clearCart(req, res) {
  const userId = Number.parseInt(req.params.user_id, 10);

  if (Number.isNaN(userId) || userId < 1) {
    return res.status(400).send("Invalid user id");
  }

  try {
    await databaseClient`
      DELETE FROM cart WHERE user_id = ${userId}`;

    return res.status(200).send("Cart cleared");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
