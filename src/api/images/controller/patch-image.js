import databaseClient from "../../../services/database.js";

export default async function patchImage(req, res) {
  const id = req.params.id;
  const { name, url, product_id } = req.body;

  try {
    if (name === undefined && url === undefined && product_id === undefined) {
      return res.status(400).send("No data to update");
    }

    let result;
    if ((name !== undefined && url !== undefined, product_id !== undefined)) {
      result = await databaseClient`
        UPDATE images SET name = ${name}, url = ${url}, product_id = ${product_id} WHERE id = ${id} RETURNING *`;
    } else if (name !== undefined) {
      result = await databaseClient`
        UPDATE images SET name = ${name} WHERE id = ${id} RETURNING *`;
    } else if (url !== undefined) {
      result = await databaseClient`
        UPDATE images SET url = ${url} WHERE id = ${id} RETURNING *`;
    } else if (product_id !== undefined) {
      result = await databaseClient`
        UPDATE images SET product_id = ${product_id} WHERE id = ${id} RETURNING *`;
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
