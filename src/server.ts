import App from './app';
import { initializeDatabase } from './libs/database';
import CsvComponent from './api/csv/component'

async function start() {
  await initializeDatabase('TOSS')
  const app = new App([
    new CsvComponent()
  ])
  app.listen();
}
start();