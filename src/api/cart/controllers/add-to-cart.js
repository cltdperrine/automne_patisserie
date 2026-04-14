import databaseClient from "../../../services/database.js";
import { parsePositiveInt } from "../parse-positive-int.js";

export default async function addToCart(req, res) {
  const userParse = parsePositiveInt(req.params.user_id, "user id");
  if (!userParse.ok) {
    return res.status(400).send(userParse.error);
  }

  const { product_id, quantity } = req.body;
  const productParse = parsePositiveInt(product_id, "product id");
  const quantityParse = parsePositiveInt(quantity, "quantity");

  if (!productParse.ok) {
    return res.status(400).send(productParse.error);
  }
  if (!quantityParse.ok) {
    return res.status(400).send(quantityParse.error);
  }

  const userId = userParse.value;
  const productId = productParse.value;
  const qty = quantityParse.value;

  try {
    const product = await databaseClient`
      SELECT id FROM products WHERE id = ${productId}`;
    if (product.length === 0) {
      return res.status(404).send("Product not found");
    }

    const result = await databaseClient`
      INSERT INTO cart (product_id, user_id, quantity)
      VALUES (${productId}, ${userId}, ${qty})
      ON CONFLICT (product_id, user_id)
      DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
      RETURNING *`;

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error during cart item add");
  }
}
