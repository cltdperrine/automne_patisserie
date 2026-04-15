import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function getProduct(req, res) {
  const { id } = req.params;

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid product id");
  }

  try {
    const result = await databaseClient`
    SELECT * FROM products WHERE id = ${id}`;

    if (result.length === 0) {
      return res.status(404).send("Product not found");
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error during product retrieval",
        error: error.message,
      });
  }
}
