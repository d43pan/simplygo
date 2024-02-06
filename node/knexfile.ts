
import { Knex } from 'knex';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_DB || 'knex-pg-db',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_USER_PW || '<INSERT PASSWORD FOR postgres USER HERE>',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      host: process.env.POSTGRES_HOST || 'localhost'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL || '',
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};

export default config;