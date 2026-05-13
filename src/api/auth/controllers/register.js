import databaseClient from "../../../services/database.js";
import bcrypt from "bcrypt";

export default async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).json("All fields are required");
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await databaseClient`        
        INSERT INTO users (email, password)
        VALUES (${email}, ${hashed})
        RETURNING email;`;

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during user creation", error: error.message });
  }
}
