import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { resetDatabaseSchema } from "./database-schema.js";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

if (process.env.ALLOW_DB_RESET !== "true") {
  console.error("Refusing to reset database. Set ALLOW_DB_RESET=true to continue.");
  process.exit(1);
}

const databaseClient = neon(databaseUrl);

resetDatabaseSchema(databaseClient)
  .then(() => {
    console.log("Database reset completed");
  })
  .catch((error) => {
    console.error("Error during database reset", error);
    process.exit(1);
  });
