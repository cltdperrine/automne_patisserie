import databaseClient from "../../../services/database.js";
import { parsePositiveInt } from "../parse-positive-int.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function createCart(req, res) {
  const { product_id, user_id, quantity } = req.body;

  if (!isValidUUID(user_id) || !isValidUUID(product_id)) {
    return res.status(400).send("Invalid user or product id");
  }

  const quantityParse = parsePositiveInt(quantity, "quantity");
  if (!quantityParse.ok) {
    return res.status(400).send(quantityParse.error);
  }

  const qty = quantityParse.value;

  try {
    const product = await databaseClient`
    SELECT id FROM products WHERE id = ${product_id}`;
    if (product.length === 0) {
      return res.status(404).send("Product not found");
    }

    const result = await databaseClient`
    INSERT INTO cart (product_id, user_id, quantity)
    VALUES (${product_id}, ${user_id}, ${qty})
    ON CONFLICT (product_id, user_id)
    DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
    RETURNING *`;

    return res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error during cart item creation");
  }
}
