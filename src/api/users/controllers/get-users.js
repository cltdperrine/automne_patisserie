import databaseClient from "../../../services/database.js";

export default async function getUsers(req, res) {
  try {
    const users = await databaseClient`
      SELECT * FROM users`;

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error during users retrieval", error: error.message });
  }
}