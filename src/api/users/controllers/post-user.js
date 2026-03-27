import databaseClient from "../../../services/database.js";

export default async function createUser(req, res) {
  const { first_name, last_name, email, password } = req.body;

  try {
    await databaseClient`        
        INSERT INTO users(first_name, last_name, email, password)
        VALUES(${first_name}, ${last_name}, ${email}, ${password});`;
    return res.status(200).send("User created successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error during user creation");
  }
}
