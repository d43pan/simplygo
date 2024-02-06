import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

const tableName = 'users';

export const seed = async function (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  const users = Array.from({ length: 10 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    //password: faker.internet.password(),
    // Add more fields as per your user schema
  }));

  // Inserts seed entries
  await knex(tableName).insert(users);
};