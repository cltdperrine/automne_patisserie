import databaseClient from "../../../services/database.js";

export default async function patchCategory(req, res) {
  const id = req.params.id;
  const { name, image } = req.body;

  try {
    if (name === undefined && image === undefined) {
      return res.status(400).send("No data to update");
    }

    let result;
    if (name !== undefined && image !== undefined) {
      result = await databaseClient`
        UPDATE categories SET name = ${name}, image = ${image} WHERE id = ${id} RETURNING *`;
    } else if (name !== undefined) {
      result = await databaseClient`
        UPDATE categories SET name = ${name} WHERE id = ${id} RETURNING *`;
    } else if (image !== undefined) {
      result = await databaseClient`
        UPDATE categories SET image = ${image} WHERE id = ${id} RETURNING *`;
    }

    if (!result[0]) {
      return res.status(404).send("Category not found");
    }
    return res.status(201).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during category update", error.message);
  }
}
