import databaseClient from "../../../services/database.js";

export default async function createCart(req, res) {
  const { products_id, users_id } = req.body;
  try {
    const product = await databaseClient`
    SELECT id FROM products WHERE id = ${products_id}`;
    if (product.length === 0) {
      return res.status(404).send("Product not found");
    }

    const result = await databaseClient`
    INSERT INTO cart (products_id, users_id)
    VALUES (${products_id}, ${users_id})
    ON CONFLICT (products_id, users_id) DO NOTHING
    RETURNING *`;

    if (result.length === 0) {
      return res.status(200).send("Product already in cart");
    }

    return res.status(201).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during cart item creation");
  }
}
