import databaseClient from "../../../services/database.js";

export default async function getProducts(req, res) {
  try {
    const products = await databaseClient`
      SELECT * FROM products`;

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error during products retrieval",
      error: error.message,
    });
  }
}
