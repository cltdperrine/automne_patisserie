import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function patchCategory(req, res) {
  const id = req.params.id;
  const { name, image } = req.body;

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid category id");
  }

  if (name === undefined && image === undefined) {
    return res.status(400).send("No data to update");
  }

  try {
    let result;

    if (name !== undefined && image !== undefined) {
      result = await databaseClient`
        UPDATE categories SET name = ${name}, image = ${image} WHERE id = ${id} RETURNING *`;
    } else if (name !== undefined) {
      result = await databaseClient`
        UPDATE categories SET name = ${name} WHERE id = ${id} RETURNING *`;
    } else {
      result = await databaseClient`
        UPDATE categories SET image = ${image} WHERE id = ${id} RETURNING *`;
    }

    if (!result[0]) {
      return res.status(404).send("Category not found");
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during category update", error: error.message });
  }
}
