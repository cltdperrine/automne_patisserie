import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { createDatabaseSchema } from "./database-schema.js";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const databaseClient = neon(databaseUrl);

createDatabaseSchema(databaseClient)
  .then(() => {
    console.log("Database initialized");
  })
  .catch((error) => {
    console.error("Error during database initialization", error);
    process.exit(1);
  });
