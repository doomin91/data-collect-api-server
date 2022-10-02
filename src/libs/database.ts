import Database from 'better-sqlite3';
export let database: any;

export async function initializeDatabase(filename:string, options?:object) {
  database = new Database(filename, options);
}
export async function close() {
  if (database) {
    database.close();
  }
}
export function transaction(cb: any) {
  let result;
  database.transaction(() => {
    result = cb();
  })();
  return result;
}
