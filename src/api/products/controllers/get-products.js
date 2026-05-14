import databaseClient from "../../../services/database.js";

export default async function getProducts(req, res) {
  try {
    const products = await databaseClient`
      SELECT
        p.*,
        (
          SELECT i.url
          FROM images i
          WHERE i.product_id = p.id
          ORDER BY i.created_at ASC
          LIMIT 1
        ) AS image_url
      FROM products p
      ORDER BY p.created_at ASC`;

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error during products retrieval",
      error: error.message,
    });
  }
}
