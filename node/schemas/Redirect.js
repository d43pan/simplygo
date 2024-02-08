const baseSchema = require('./Base.js');

const redirectSchema = (table) => {
    baseSchema(table),
    table.string('path').notNullable();
    table.string('url').notNullable();
    table.integer('userId').references('id').inTable('users').notNullable();
    table.integer('organizationId').references('id').inTable('organizations').notNullable();
    table.unique(['path', 'organizationId']);
  }
  
  module.exports = redirectSchema;