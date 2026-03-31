import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const databaseClient = neon(
  "postgresql://neondb_owner:npg_S9aIVu6PKQhR@ep-jolly-meadow-ab0dd0zk-pooler.eu-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
);

async function updateDatabase() {
  await databaseClient`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

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

  await databaseClient`DROP TABLE IF EXISTS orders CASCADE;`;

  await databaseClient`DROP TYPE IF EXISTS status`;

  await databaseClient`CREATE TYPE status as ENUM ('pending', 'canceled', 'fulfilled')`;

  await databaseClient`CREATE TABLE IF NOT EXISTS orders (
id SERIAL PRIMARY KEY,
client_id INT,
status status NOT NULL DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  await databaseClient`ALTER TABLE orders
ADD CONSTRAINT fk_orders_user
FOREIGN KEY (client_id)
REFERENCES users(id)
ON DELETE CASCADE`;

  await databaseClient`CREATE TABLE IF NOT EXISTS images (
id SERIAL PRIMARY KEY,
name TEXT,
url TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  await databaseClient`ALTER TABLE images
ADD COLUMN IF NOT EXISTS product_id INT`;

  await databaseClient`CREATE TABLE IF NOT EXISTS order_products (
order_id INT REFERENCES orders(id) ON DELETE CASCADE,
product_id INT REFERENCES products(id) ON DELETE CASCADE,
quantity INT DEFAULT 1,
PRIMARY KEY (order_id, product_id)
)`;

  await databaseClient` CREATE TABLE IF NOT EXISTS order_products (
order_id INT REFERENCES orders(id) ON DELETE CASCADE,
product_id INT REFERENCES produts(id) ON DELETE CASCADE,
quantity INT DEFAULT 1,
PRIMARY KEY (order_id, product_id))`;

  await databaseClient`
CREATE TABLE IF NOT EXISTS product_categories (
product_id INT REFERENCES products(id) ON DELETE CASCADE,
category_id INT REFERENCES categories(id) ON DELETE CASCADE,
PRIMARY KEY (product_id, category_id))`;
}

updateDatabase()
  .then(() => {
    console.log("Database updated");
  })
  .catch((error) => {
    console.log("Error during database update", error);
  });
