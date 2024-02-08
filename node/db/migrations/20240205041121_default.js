const userSchema = require('../../schemas/User.js');
const organizationSchema = require('../../schemas/Organization.js');
const redirectSchema = require('../../schemas/Redirect.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', userSchema)
        .createTable('organizations', organizationSchema)
        .createTable('redirects', redirectSchema);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('redirects')
        .dropTable('organizations')
        .dropTable('users');
};