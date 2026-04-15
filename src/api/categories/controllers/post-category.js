import databaseClient from "../../../services/database.js";

export default async function createCategory(req, res) {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).send("Name and image are required");
  }
  try {
    const result =
      await databaseClient`INSERT INTO categories (name, image) VALUES (${name}, ${image}) RETURNING *`;
    return res.status(201).send(result[0]);
  } catch (error) {
    console.error("Create category error:", error);
    return res
      .status(500)
      .send({
        message: "Error during category creation",
        error: error.message,
      });
  }
}
