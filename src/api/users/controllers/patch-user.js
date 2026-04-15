import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function patchUser(req, res) {
  const id = req.params.id;
  const { first_name, last_name, email, password } = req.body;

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid user id");
  }

  if (
    first_name === undefined &&
    last_name === undefined &&
    email === undefined &&
    password === undefined
  ) {
    return res.status(400).send("No data to update");
  }

  try {
    let result;

    if (first_name !== undefined) {
      result = await databaseClient`
      UPDATE users SET first_name = ${first_name}
      WHERE id = ${id} RETURNING *`;
    }

    if (last_name !== undefined) {
      result = await databaseClient`
      UPDATE users SET last_name = ${last_name}
      WHERE id = ${id} RETURNING *`;
    }
    if (email !== undefined) {
      result = await databaseClient`
      UPDATE users SET email = ${email}
      WHERE id = ${id} RETURNING *`;
    }
    if (password !== undefined) {
      result = await databaseClient`
      UPDATE users SET password = ${password}
      WHERE id = ${id} RETURNING *`;
    }

    if (!result[0]) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during user update", error: error.message });
  }
}
