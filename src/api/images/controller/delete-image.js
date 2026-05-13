import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function deleteImage(req, res) {
  const { id } = req.params;

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid image id");
  }

  try {
    const result = await databaseClient`
    DELETE FROM images WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).send("Image not found");
    }
    return res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during image deletion", error: error.message });
  }
}
