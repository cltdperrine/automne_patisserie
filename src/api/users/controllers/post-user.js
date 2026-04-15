import databaseClient from "../../../services/database.js";

export default async function createUser(req, res) {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await databaseClient`        
        INSERT INTO users (first_name, last_name, email, password)
        VALUES (${first_name}, ${last_name}, ${email}, ${password})
        RETURNING *;`;

    return res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during user creation", error: error.message });
  }
}
