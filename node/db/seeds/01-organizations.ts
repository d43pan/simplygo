import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

const tableName = 'organizations';

export const seed = async function (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  const organizations = Array.from({ length: 10 }, () => ({
    name: faker.company.name(),
  }));

  // Inserts seed entries
  await knex(tableName).insert(organizations);
};