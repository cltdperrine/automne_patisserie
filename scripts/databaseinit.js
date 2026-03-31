import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const databaseClient = neon(
  "postgresql://neondb_owner:npg_S9aIVu6PKQhR@ep-jolly-meadow-ab0dd0zk-pooler.eu-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
);

async function createTable() {
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

  await databaseClient`
DROP TYPE IF EXISTS status CASCADE`;

  await databaseClient`CREATE TYPE status as ENUM ('pending', 'canceled', 'fulfilled')`;

  await databaseClient`CREATE TABLE IF NOT EXISTS orders (
id SERIAL PRIMARY KEY,
client_id INT,
status status,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  await databaseClient`CREATE TABLE IF NOT EXISTS images (
id SERIAL PRIMARY KEY,
name TEXT,
url TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
}

createTable()
  .then(() => {
    console.log("Table created");
  })
  .catch((error) => {
    console.log("Error during table creation", error);
  });
