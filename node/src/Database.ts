import knex, { Knex } from 'knex';
import config from '../knexfile';

const environment = process.env.NODE_ENV || 'development';
const configuration = config[environment];
const knexInstance = knex(configuration);

class Database {
    constructor(private knex: Knex) {}

    async getRecentRedirects(limit: number = 10) {
        try {
            const recentRedirects = await this.knex('redirects')
                .orderBy('created_at', 'desc')
                .limit(limit);
            return recentRedirects;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('An error occurred while fetching redirects');
        }
    }
}

const db = new Database(knexInstance);

export default db;