import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function deleteCategory(req, res) {
  const { id } = req.params;

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid category id");
  }

  try {
    const result = await databaseClient`
    DELETE FROM categories WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).send("Category not found");
    }
    return res.status(200).send("Category deleted");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Error during category deletion", error.message);
  }
}
