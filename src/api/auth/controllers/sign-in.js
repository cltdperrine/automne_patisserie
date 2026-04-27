import databaseClient from "../../../services/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SIGNATURE = process.env.JWT_SECRET;

export default async function signIn(req, res) {
  // on récupère l'email et le mdp que nous envoie l'utilisateur
  const { email, password } = req.body;

  // on récupère l'utilisateur en db grâce à l'email
  const [user] = await databaseClient`
  SELECT * FROM users WHERE email = ${email}`;

  // on compare le mdp et le hash

  const isValid = await bcrypt.compare(password, user.password);
  // si ça ne matche pas, on rejette la requête
  if (isValid === false) {
    return res.status(401).json("Invalid password");
  }

  //on construit un payload sans le mdp
  const payload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };

  //on signe un token
  const token = jwt.sign(payload, SIGNATURE);

  //on l'envoie à l'utilisateur avec ses infos
  return res.status(200).json({ user: payload, token });
}
