import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function getUser(req, res) {
  const { id } = req.params;

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid user id");
  }

  try {
    const result = await databaseClient`
    SELECT * FROM users 
    WHERE id = ${id}`;

    if (result.length === 0) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during user retrieval", error: error.message });
  }
}
