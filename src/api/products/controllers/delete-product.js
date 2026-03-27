import databaseClient from "../../../services/database.js";

export default async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const result = await databaseClient`
    DELETE FROM products WHERE id = ${id}
    RETURNING *`;

    if (result.length === 0) {
      return res.status(404).send("Product not found");
    }
    return res.status(200).send("Product deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during product deletion", error.message);
  }
}
