import databaseClient from "../../../services/database.js";

export default async function patchCart(req, res) {
  const product_id = req.params.product_id;
  const user_id = req.params.user_id;
  const { quantity } = req.body;

  try {
    if (quantity === undefined) {
      return res.status(400).send("No data to update");
    }

    const result = await databaseClient`
        UPDATE cart SET quantity = ${quantity} WHERE product_id = ${product_id} AND user_id = ${user_id} RETURNING *`;

    if (!result[0]) {
      return res.status(404).send("Cart not found");
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error during cart update", error: error.message });
  }
}
