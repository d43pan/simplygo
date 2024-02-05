
const baseSchema = (table) => {
    table.increments('id').primary();
    table.timestamps(true, true); // Adds 'created_at' and 'updated_at' columns
    table.boolean('deleted').defaultTo(false); // Adds 'deleted' column
}

module.exports = baseSchema;