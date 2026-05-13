import databaseClient from "../../../services/database.js";

export default async function createProduct(req, res) {
  const { name, price, description, allergens } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const result = await databaseClient`
      INSERT INTO products (name, price, description, allergens) 
      VALUES (${name}, ${price}, ${description}, ${allergens}) 
      RETURNING *
    `;

    return res.status(201).json(result[0]);
  } catch (error) {
    console.error("Create product error:", error);
    return res
      .status(500)
      .json({ message: "Error during product creation", error: error.message });
  }
}
