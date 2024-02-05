const baseSchema = require('./Base.ts');

const organizationSchema = (table) => {
    baseSchema(table),
    table.string('name').notNullable();
  }
  
  module.exports = organizationSchema;