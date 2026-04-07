import databaseClient from "../../../services/database.js";

export default async function patchCart(req, res) {
  const id = parseInt(req.params.id);
  const { products_id, users_id } = req.body;

  try {
    if (products_id === undefined && users_id === undefined) {
      return res.status(400).send("No data to update");
    }

    let result;
    if (products_id !== undefined && users_id !== undefined) {
      result = await databaseClient`
        UPDATE cart SET products_id = ${products_id}, users_id = ${users_id} WHERE id = ${id} RETURNING *`;
    } else if (products_id !== undefined) {
      result = await databaseClient`
        UPDATE cart SET products_id = ${products_id} WHERE id = ${id} RETURNING *`;
    } else if (users_id !== undefined) {
      result = await databaseClient`
        UPDATE cart SET users_id = ${users_id} WHERE id = ${id} RETURNING *`;
    }

    if (!result[0]) {
      return res.status(404).send("Cart not found");
    }
    return res.status(201).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during cart update", error.message);
  }
}
