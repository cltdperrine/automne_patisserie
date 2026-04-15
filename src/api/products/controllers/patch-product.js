import databaseClient from "../../../services/database.js";

function isValidUUID(value) {
  return typeof value === "string" && value.length === 36;
}

export default async function patchProduct(req, res) {
  const id = req.params.id;
  const { name, price, description, allergens } = req.body;

  if (!isValidUUID(id)) {
    return res.status(400).send("Invalid product id");
  }

  if (
    name === undefined &&
    price === undefined &&
    description === undefined &&
    allergens === undefined
  ) {
    return res.status(400).send("No data to update");
  }

  try {
    let result;

    if (
      name !== undefined &&
      price !== undefined &&
      description !== undefined &&
      allergens !== undefined
    ) {
      result = await databaseClient`
        UPDATE products
        SET name = ${name}, price = ${price}, description = ${description}, allergens = ${allergens}
        WHERE id = ${id}
        RETURNING *`;
    } else if (name !== undefined) {
      result = await databaseClient`
    UPDATE products
    SET name = ${name}
    WHERE id = ${id}
    RETURNING *`;
    } else if (price !== undefined) {
      result = await databaseClient`
    UPDATE products
    SET price = ${price}
    WHERE id = ${id}
    RETURNING *`;
    } else if (description !== undefined) {
      result = await databaseClient`
    UPDATE products
    SET description = ${description}
    WHERE id = ${id}
    RETURNING *`;
    } else {
      result = await databaseClient`
    UPDATE products
    SET allergens = ${allergens}
    WHERE id = ${id}
    RETURNING *`;
    }

    if (!result[0]) {
      return res.status(404).send("Product not found");
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during product update", error: error.message });
  }
}
