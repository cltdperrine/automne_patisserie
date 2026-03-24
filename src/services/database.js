import { neon } from '@neondatabase/serverless';

const databaseClient = neon("postgresql://neondb_owner:npg_S9aIVu6PKQhR@ep-jolly-meadow-ab0dd0zk-pooler.eu-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require")

export default databaseClient;