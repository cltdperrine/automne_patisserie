import databaseClient from "../../../services/database.js";

export default async function getProduct(req, res) {
  const { id } = req.params;

  try {
    const result = await databaseClient`
    SELECT * FROM products WHERE id = ${id}`;
    console.log(result);
    if (result.length === 0) {
      return res.status(404).send("Product not found");
    }
    return res.json(result[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Error during product retrieval", error.message);
  }
}
