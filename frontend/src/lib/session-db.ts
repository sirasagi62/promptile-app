import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface SessionDB extends DBSchema {
  sessions: {
    key: string;
    value: Session;
  };
}

export type Session = {
  id: string;
  title: string;
  template: string;
  createdAt: number;
};

let dbPromise: Promise<IDBPDatabase<SessionDB>>;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<SessionDB>('sessions-db', 1, {
      upgrade(db) {
        db.createObjectStore('sessions', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}
