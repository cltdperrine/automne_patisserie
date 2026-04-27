export async function createDatabaseSchema(databaseClient) {
  await databaseClient`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto"
  `;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name TEXT,
      last_name TEXT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `;
  await databaseClient`
        CREATE TABLE IF NOT EXISTS categories (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          image TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      description TEXT,
      allergens TEXT,
      category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await databaseClient`
    DO $$
    BEGIN
      CREATE TYPE status AS ENUM ('pending', 'canceled', 'fulfilled');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END
    $$;
  `;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      client_id UUID REFERENCES users(id) ON DELETE CASCADE,
      status status NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS images (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT,
      url TEXT,
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await databaseClient`
    CREATE TABLE IF NOT EXISTS cart (
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      quantity INT NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(product_id, user_id)
    )
  `;
}

export async function resetDatabaseSchema(databaseClient) {
  await databaseClient`DROP TABLE IF EXISTS cart CASCADE;`;
  await databaseClient`DROP TABLE IF EXISTS images CASCADE;`;
  await databaseClient`DROP TABLE IF EXISTS orders CASCADE;`;
  await databaseClient`DROP TABLE IF EXISTS categories CASCADE;`;
  await databaseClient`DROP TABLE IF EXISTS products CASCADE;`;
  await databaseClient`DROP TABLE IF EXISTS users CASCADE;`;
  await databaseClient`DROP TYPE IF EXISTS status;`;

  await createDatabaseSchema(databaseClient);
}
