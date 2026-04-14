import databaseClient from "../../../services/database.js";

export default async function getCart(req, res) {
  const { user_id } = req.params;

  try {
    const result = await databaseClient`
<<<<<<< Updated upstream
    SELECT * FROM cart WHERE users_id = ${id}`;
=======
    SELECT * FROM cart WHERE user_id = ${user_id}`;
>>>>>>> Stashed changes

    if (result.length === 0) {
      return res.status(200).json(result);
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
