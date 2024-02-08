const baseSchema = require('./Base.js');

const organizationSchema = (table) => {
    baseSchema(table),
    table.string('name').notNullable();
  }
  
  module.exports = organizationSchema;