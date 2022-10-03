import { Request, Response, Router } from 'express';

import TransactionRouter from './route';
import TransactionService from './service';
import TransactionDao from './dao'

export default class TransactionComponent {
    router: Router = Router();
    route: TransactionRouter = new TransactionRouter(this);
    service: TransactionService = new TransactionService(new TransactionDao())

    constructor () {
        this.getRouter();
    }

    getRouter(){
        const { path, router }  = this.route.initializeRouter();
        this.router.use(path, router);
    }
    
    getService(): TransactionService{
        return this.service;
    }

    getTransaction = (req: Request, res: Response) => {
        const { startDate, endDate } = req.params
        const result = this.getService().getTransaction(startDate, endDate);
        return result;
    }

    getTransactionById = (req: Request, res: Response) => {
        const { transactionId } = req.params;
        const result = this.getService().getTransactionById(transactionId);
        return result;
    }

    getHistory = (req: Request, res: Response) => {
        const result = this.getService().getHistory();
        return result;
    }
}