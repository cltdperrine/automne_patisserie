import databaseClient from "../../../services/database.js";
import { parsePositiveInt } from "../parse-positive-int.js";

export default async function patchCartItem(req, res) {
  const userParse = parsePositiveInt(req.params.user_id, "user id");
  const productParse = parsePositiveInt(req.params.product_id, "product id");

  if (!userParse.ok) {
    return res.status(400).send(userParse.error);
  }
  if (!productParse.ok) {
    return res.status(400).send(productParse.error);
  }

  const { quantity } = req.body;
  const quantityParse = parsePositiveInt(quantity, "quantity");
  if (quantity === undefined || !quantityParse.ok) {
    return res.status(400).send("Valid quantity is required");
  }

  const userId = userParse.value;
  const productId = productParse.value;
  const qty = quantityParse.value;

  try {
    const result = await databaseClient`
      UPDATE cart
      SET quantity = ${quantity}
      WHERE product_id = ${productId} AND user_id = ${userId}
      RETURNING *`;

    if (!result[0]) {
      return res.status(404).send("Cart line not found");
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error during cart update",
      error: error.message,
    });
  }
}
