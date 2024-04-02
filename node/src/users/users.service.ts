import db from '../Database';

export async function getUserById(user_id: string) {
  return db.getUserById(user_id);
}

export async function getFullUserById(user_id: string) {
  return db.getFullUserById(user_id);
}

export async function createOrUpdateUser(user: any) {
  return db.createOrUpdateUser(user);
}