import databaseClient from "../../../services/database.js";

export default async function getCart(req, res) {
  const userId = Number.parseInt(req.params.user_id, 10);

  if (Number.isNaN(userId)) {
    return res.status(400).send("Invalid user id");
  }

  try {
    const result = await databaseClient`
      SELECT * FROM cart WHERE user_id = ${userId}`;

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
