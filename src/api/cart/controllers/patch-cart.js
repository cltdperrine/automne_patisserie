import databaseClient from "../../../services/database.js";

export default async function patchCart(req, res) {
  const products_id = parseInt(req.params.products_id);
  const users_id = parseInt(req.params.users_id);
  const { quantity } = req.body;

  try {
    if (quantity === undefined) {
      return res.status(400).send("No data to update");
    }

    const result = await databaseClient`
        UPDATE cart SET quantity = ${quantity} WHERE products_id = ${products_id} AND users_id = ${users_id} RETURNING *`;

    if (!result[0]) {
      return res.status(404).send("Cart not found");
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during cart update", error.message);
  }
}
