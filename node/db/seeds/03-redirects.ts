
import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

const tableName = 'redirects';

export const seed = async function (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Assuming you have some users and organizations in your database,
  // replace these with actual user and organization IDs if necessary.
  const userIds = [1, 2, 3];
  const organizationIds = [1, 2, 3];

  const redirects = Array.from({ length: 10 }, () => {
    const randomUserIndex = Math.floor(Math.random() * userIds.length);
    const randomOrgIndex = Math.floor(Math.random() * organizationIds.length);


    return { 
      path: faker.internet.url(),
      url: faker.internet.url(),
      userId: userIds[randomUserIndex],
      organizationId: organizationIds[randomOrgIndex],
    }
  });

  // Inserts seed entries
  await knex(tableName).insert(redirects);
};