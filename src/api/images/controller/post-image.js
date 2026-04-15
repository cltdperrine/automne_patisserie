import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function createImage(req, res) {
  const { name, url, product_id } = req.body;

  if (!url || !product_id) {
    return res.status(400).send("Url and product_id are required");
  }

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid product id");
  }

  try {
    const result = await databaseClient`
    INSERT INTO images (name, url, product_id) VALUES (${name}, ${url}, ${product_id}) RETURNING *`;

    return res.status(201).send(result[0]);
  } catch (error) {
    console.error("Create order error:", error);
    return res
      .status(500)
      .json({ message: "Error during image creation", error: error.message });
  }
}
