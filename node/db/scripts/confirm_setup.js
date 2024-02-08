require('dotenv').config({path: '../../.env'});
const knex = require('knex')({
    client: 'pg',
    connection: {
        host : process.env.POSTGRES_HOST,
        user : process.env.POSTGRES_USER,
        password : process.env.POSTGRES_USER_PW,
        database : process.env.POSTGRES_DB
    }
});

knex.select('tablename').from('pg_tables')
  .where('schemaname', 'public') // replace 'public' with your schema name if it's not 'public'
  .then(tables => {
    return Promise.all(tables.map(table => {
      return knex.select('*').from(table.tablename).first()
        .then(row => {
          console.log(`First row from ${table.tablename}:`, row);
        });
    }));
  })
  .catch(err => {
    console.error('Error executing query', err);
  })
  .finally(() => {
    knex.destroy();
    process.exit();
  });