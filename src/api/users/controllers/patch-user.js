import databaseClient from "../../../services/database.js";

export default async function patchUser(req, res) {
  const id = parseInt(req.params.id);
  const { first_name, last_name, email, password } = req.body;

  try {
    if (
      first_name === undefined &&
      last_name === undefined &&
      email === undefined &&
      password === undefined
    ) {
      return res.status(400).send("No data to update");
    }

    let result;
    if (
      first_name !== undefined &&
      last_name !== undefined &&
      email !== undefined &&
      password !== undefined
    ) {
      result = await databaseClient`
        UPDATE users
        SET first_name = ${first_name}, email = ${email}
        WHERE id = ${id}
        RETURNING *;
      `;
    } else if (first_name !== undefined) {
      result = await databaseClient`
        UPDATE users
        SET first_name = ${first_name}
        WHERE id = ${id}
        RETURNING *;
      `;
    } else if (last_name !== undefined) {
      result = await databaseClient`
        UPDATE users
        SET email = ${last_name}
        WHERE id = ${id}
        RETURNING *;
      `;
    } else if (email !== undefined) {
      result = await databaseClient`
        UPDATE users
        SET email = ${email}
        WHERE id = ${id}
        RETURNING *;
      `;
    } else if (password !== undefined) {
      result = await databaseClient`
        UPDATE users
        SET email = ${password}
        WHERE id = ${id}
        RETURNING *;
      `;
    }

    if (!result[0]) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during user update");
  }
}
