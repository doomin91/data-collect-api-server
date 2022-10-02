import { Router } from 'express';
import CsvComponent from './component';
import successWrapper from '../../libs/success';

export default class CsvRoute {
  component: CsvComponent
  constructor (component: CsvComponent) {
    this.component = component
  }

  initializeRouter() {
    const router: Router = Router();
    const path: string = '/csv';
    router.post    ('/insertDataFromCsvFile/:fileName', successWrapper(this.component.insertDataFromCsvFile))
    return { path, router }
  }

}
