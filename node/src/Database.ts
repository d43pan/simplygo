import knex, { Knex } from 'knex';
import config from '../knexfile';
import validator from 'validator';

const environment = process.env.NODE_ENV || 'development';
const configuration = config[environment];
const knexInstance = knex(configuration);

class Database {
    constructor(private knex: Knex) {}





//USER


    async getUserById(user_id: string) {
        try {
            const user = await this.knex('users')
                .where('id', user_id)
                .select('name') // Select only the 'name' column
                .first();
            return user;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('An error occurred while fetching the user');
        }
    }

    async getFullUserById(user_id: string) {
        try {
            const user = await this.knex('users')
                .where('auth0_sub', user_id)
                .first();

            const organizations = await this.knex('organizations')
                .where('user_id', user_id);

            const redirects = await this.knex('redirects')
                .where('user_id', user_id);

            return { ...user, organizations, redirects };
        } catch (error) {
            console.error('Error:', error);
            throw new Error('An error occurred while fetching the user');
        }
    }


    async createOrUpdateUser(user: any) {
        let dbUser;
        try {
            console.log("createOrUpdateUser user: ", user)
            const existingUser = await this.knex('users')
                .where('auth0_sub', user.auth0_sub)
                .first();
    
            if (existingUser) {
                // Update existing user
                await this.knex('users')
                    .where('auth0_sub', user.auth0_sub)
                    .update({
                        email: user.email,
                        // Update any other user properties you need
                    });
    
                // Return the updated user
                dbUser = await this.knex('users')
                    .where('auth0_sub', user.auth0_sub)
                    .first();
            } else {
                // Create new user
                const [createdUser] = await this.knex('users').insert({
                    email: user.email,
                    auth0_sub: user.auth0_sub
                    // Add any other user properties you need
                }).returning('*');
    
                // Return the created user

                
                dbUser = createdUser;
            }
            console.log("createOrUpdateUser dbUser: ", dbUser)
            return dbUser;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('An error occurred while creating or updating the user');
        }
    }

// REDIRECTS


validateRedirect(redirect: { path: string; url: string }) {
    if (!validator.isURL(redirect.url)) {
        throw new Error('Invalid URL');
    }

    const pathRegex = /^[a-zA-Z0-9-]+$/;
    if (!pathRegex.test(redirect.path)) {
        throw new Error('Invalid path');
    }
}


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

    async getRedirectByPath(path: string) {
        try {
            const redirect = await this.knex('redirects')
                .where('path', path)
                .first();
            return redirect;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('An error occurred while fetching the redirect');
        }
    }

    async createRedirect(path: string, url: string) {
        try {
            const userId = 1;
            const organizationId = 1;
            const newRedirect = { path, url, userId, organizationId };

            this.validateRedirect(newRedirect);

            await this.knex('redirects').insert(newRedirect);
            return newRedirect;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('An error occurred while creating the redirect');
        }
    }
}

const db = new Database(knexInstance);

export default db;