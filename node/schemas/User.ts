const baseSchema = require('./Base.ts');

const userSchema = (table) => {
    baseSchema(table),
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
  }
  
  module.exports = userSchema;