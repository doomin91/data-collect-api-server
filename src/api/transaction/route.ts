import { Router } from 'express';
import TransactionComponent from './component';
import successWrapper from '../../libs/success';

export default class TransactionRoute {
  component: TransactionComponent
  constructor (component: TransactionComponent) {
    this.component = component
  }

  initializeRouter() {
    const router: Router = Router();
    const path: string = '/transaction';
    router.get ('/getTransaction/:startDate/:endDate', successWrapper(this.component.getTransaction))
    router.get ('/getTransaction/:transactionId', successWrapper(this.component.getTransactionById))
    router.get ('/getHistory', successWrapper(this.component.getHistory))
    return { path, router }
  }
}
