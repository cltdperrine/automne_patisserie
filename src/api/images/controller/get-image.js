import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function getImage(req, res) {
  const { id } = req.params;

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid image id");
  }

  try {
    const result = await databaseClient`
    SELECT * FROM images WHERE id = ${id}`;

    if (result.length === 0) {
      return res.status(404).send("Image not found");
    }
    return res.json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during image retrieval", error: error.message });
  }
}
