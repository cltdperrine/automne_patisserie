import databaseClient from "../../../services/database.js";

export default async function addToCart(req, res) {
  const { product_id, user_id, quantity } = req.body;

  if (!product_id || !user_id || !quantity) {
    return res.status(400).send("Missing fields");
  }
  try {
    const product = await databaseClient`
    SELECT id FROM products WHERE id = ${product_id}`;
    if (product.length === 0) {
      return res.status(404).send("Product not found");
    }

    const result = await databaseClient`
    INSERT INTO cart (product_id, user_id, quantity)
    VALUES (${product_id}, ${user_id}, ${quantity})
    ON CONFLICT (product_id, user_id)
    DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
    RETURNING *`;

    if (result.length === 0) {
      return res.status(200).send("Product already in cart");
    }

    return res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error during cart item add");
  }
}
