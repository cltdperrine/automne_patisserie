import databaseClient from "../../../services/database.js";

export default async function getCart(req, res) {
  const { id } = req.params;

  try {
    const result = await databaseClient`
    SELECT * FROM cart WHERE users_id = ${id}`;

    if (result.length === 0) {
      return res.status(404).send("Cart not found");
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during cart retrieval", error.message);
  }
}
