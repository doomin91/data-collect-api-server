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
    router.get     ('/getTransaction/', successWrapper(this.component.getTransaction))
    router.get    ('/getTransaction/:transactionId', successWrapper(this.component.getTransactionById))
    return { path, router }
  }
}
