import databaseClient from "../../../services/database.js";

export default async function patchImage(req, res) {
  const id = parseInt(req.params.id);
  const { name, url } = req.body;

  try {
    if (name === undefined && url === undefined) {
      return res.status(400).send("No data to update");
    }

    let result;
    if (name !== undefined && url !== undefined) {
      result = await databaseClient`
        UPDATE images SET name = ${name}, url = ${url} WHERE id = ${id} RETURNING *`;
    } else if (name !== undefined) {
      result = await databaseClient`
        UPDATE images SET name = ${name} WHERE id = ${id} RETURNING *`;
    } else if (url !== undefined) {
      result = await databaseClient`
        UPDATE images SET url = ${url} WHERE id = ${id} RETURNING *`;
    }

    if (!result[0]) {
      return res.status(404).send("Image not found");
    }
    return res.status(201).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during image update", error.message);
  }
}
