import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const databaseClient = neon(
  "postgresql://neondb_owner:npg_S9aIVu6PKQhR@ep-jolly-meadow-ab0dd0zk-pooler.eu-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
);

async function createDatabase() {
  await databaseClient`
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;

  await databaseClient`DROP TABLE IF EXISTS cart CASCADE;`;
  await databaseClient`DROP TABLE IF EXISTS images CASCADE;`;
  await databaseClient`DROP TABLE IF EXISTS categories CASCADE;`;
  await databaseClient`DROP TABLE IF EXISTS products CASCADE;`;
  await databaseClient`DROP TABLE IF EXISTS users CASCADE;`;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      description TEXT,
      allergens TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await databaseClient`DROP TABLE IF EXISTS orders CASCADE;`;
  await databaseClient`DROP TYPE IF EXISTS status;`;

  await databaseClient`
  CREATE TYPE status AS ENUM ('pending', 'canceled', 'fulfilled')
`;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      client_id UUID REFERENCES users(id) ON DELETE CASCADE,
      status status NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS images (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT,
      url TEXT,
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS cart (
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      quantity INT NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(product_id, user_id)
)`;
}

createDatabase()
  .then(() => {
    console.log("Database created");
  })
  .catch((error) => {
    console.log("Error during database creation", error);
  });
