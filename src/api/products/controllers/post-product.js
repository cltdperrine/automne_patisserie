import databaseClient from "../../../services/database.js";

export default async function createProduct(req, res) {
  const { name, price, description, allergens } = req.body;
  try {
    const result =
      await databaseClient`INSERT INTO products (name, price, description, allergens) VALUES (${name}, ${price}, ${description}, ${allergens}) RETURNING *
    `;
    return res.status(200).send("Product created successfully");
  } catch (error) {
    console.error("Create product error:", error);
    return res
      .status(500)
      .send({ message: "Error during product creation", error: error.message });
  }
}
