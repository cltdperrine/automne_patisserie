import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const databaseClient = neon(databaseUrl);

async function createDatabase() {
  await databaseClient`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await databaseClient`CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      description TEXT,
      allergens TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await databaseClient`CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await databaseClient`DROP TABLE IF EXISTS orders CASCADE`;

  await databaseClient`DROP TYPE IF EXISTS status`;

  await databaseClient`CREATE TYPE status AS ENUM ('pending', 'canceled', 'fulfilled')`;

  await databaseClient`CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      client_id INT REFERENCES users(id) ON DELETE CASCADE,
      status status NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await databaseClient`CREATE TABLE IF NOT EXISTS images (
      id SERIAL PRIMARY KEY,
      name TEXT,
      url TEXT,
      product_id INT REFERENCES products(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await databaseClient`
    ALTER TABLE images
    ADD COLUMN IF NOT EXISTS product_id INT REFERENCES products(id) ON DELETE CASCADE`;

  await databaseClient`DROP TABLE IF EXISTS cart CASCADE`;

  await databaseClient`CREATE TABLE cart (
      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (product_id, user_id)
    )`;

  await databaseClient`CREATE TABLE IF NOT EXISTS order_products (
      order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
      PRIMARY KEY (order_id, product_id)
    )`;

  await databaseClient`CREATE TABLE IF NOT EXISTS product_categories (
      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      PRIMARY KEY (product_id, category_id)
    )`;
}

createDatabase()
  .then(() => {
    console.log("Database created");
  })
  .catch((error) => {
    console.log("Error during database creation", error);
    process.exit(1);
  });
