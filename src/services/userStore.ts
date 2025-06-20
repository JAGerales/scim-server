import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { User } from '../types/index';

type Data = {
  users: User[];
};

const adapter = new JSONFile<Data>('db.json');
const db = new Low<Data>(adapter, { users: [] });

export async function initDB() {
  await db.read();
  db.data ||= { users: [] };
  await db.write();
}

export async function addUser(user: User) {
  await db.read();
  db.data!.users.push(user);
  await db.write();
}

export async function getUser(id: string) {
  await db.read();
  return db.data!.users.find(u => u.id === id);
}

export async function updateUser(id: string, updated: Partial<User>) {
  await db.read();
  const user = db.data!.users.find(u => u.id === id);
  if (user) Object.assign(user, updated);
  await db.write();
  return user;
}

export async function deleteUser(id: string) {
  await db.read();
  db.data!.users = db.data!.users.filter(u => u.id !== id);
  await db.write();
}