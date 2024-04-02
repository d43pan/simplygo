const baseSchema = require('./Base');

const userSchema = (table) => {
  baseSchema(table),
  table.string('name');
  table.string('email').notNullable().unique();
  table.string('auth0_sub').unique();
}
  
module.exports = userSchema;