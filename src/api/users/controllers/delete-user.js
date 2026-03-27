import databaseClient from "../../../services/database.js";

export default async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const result = await databaseClient`
        DELETE FROM users WHERE id = ${id}
        RETURNING id`;

    if (result.length === 0) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send("User deleted");
  } catch (error) {
    console.log("DELETE ERROR:", error);
    return res.status(500).send("Error during user deletion");
  }
}
