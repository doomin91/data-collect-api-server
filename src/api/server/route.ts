import { Router } from 'express';
import ServerComponent from './component';
import successWrapper from '../../libs/success';

export default class ServerRoute {
  component: ServerComponent
  constructor (component: ServerComponent) {
    this.component = component
  }

  initializeRouter() {
    const router: Router = Router();
    const path: string = '/server';
    router.get    ('/getData/:port/:page', successWrapper(this.component.getDataFromServer))
    router.post    ('/insertData/:port', successWrapper(this.component.insertDataFromServer))
    return { path, router }
  }

}
