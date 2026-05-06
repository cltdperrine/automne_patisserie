import databaseClient from "../../../services/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SIGNATURE = process.env.JWT_SECRET;

export default async function signIn(req, res) {
  // get email and password sent by the user
  const { email, password } = req.body;

  console.log(req.body);

  // get the user from the db using the email
  const [user] = await databaseClient`
  SELECT * FROM users WHERE email = ${email}`;

  if (!user) {
    return res.status(401).json("Invalid credentials");
  }

  // compare the password with the hashed password
  const isValid = await bcrypt.compare(password, user.password);
  // if the passwords don't match, the request is rejected
  if (isValid === false) {
    return res.status(401).json("Invalid password");
  }

  //build a payload without the password
  const payload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };

  // sign a token
  const token = jwt.sign(payload, SIGNATURE);

  //send back the user data with the token
  return res.status(200).json({ user: payload, token });
}
