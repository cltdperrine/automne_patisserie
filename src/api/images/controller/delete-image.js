import databaseClient from "../../../services/database.js";

export default async function deleteImage(req, res) {
  const { id } = req.params;

  try {
    const result = await databaseClient`
    DELETE FROM images WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).send("Image not found");
    }
    return res.status(201).send("Image deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during image deletion", error.message);
  }
}
