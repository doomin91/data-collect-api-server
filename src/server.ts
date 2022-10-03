import App from './app';
import { initializeDatabase } from './libs/database';

import CsvComponent from './api/csv/component'
import ServerComponent from './api/server/component'
import TransactionComponent from './api/transaction/component'

async function start() {
  await initializeDatabase('TOSS')
  const app = new App([
    new CsvComponent(),
    new ServerComponent(),
    new TransactionComponent()
  ])
  app.listen();
}
start();