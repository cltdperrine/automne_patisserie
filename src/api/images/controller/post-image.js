import databaseClient from "../../../services/database.js";

export default async function createImage(req, res) {
  const { name, url } = req.body;
  try {
    const result = await databaseClient`
    INSERT INTO images (name, url) VALUES (${name}, ${url}) RETURNING *`;
    return res.status(201).send(result[0]);
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).send({
      message: "Error during image creation",
      error: error.message,
    });
  }
}
