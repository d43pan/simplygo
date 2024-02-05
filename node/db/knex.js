import environment from 'process'
import config from '../knexfile'
import knex from 'knex'
const knexInstance = knex(config[environment])
export default knexInstance
