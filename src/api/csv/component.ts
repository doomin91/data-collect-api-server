import { Request, Response, Router } from 'express';

import fs from 'fs';

import CsvRouter from './route';
import CsvService from './service';
import CsvDao from './dao'

export default class CsvComponent {
    router: Router    = Router();
    route : CsvRouter = new CsvRouter(this);
    service : CsvService = new CsvService(new CsvDao())

    constructor () {
        this.getRouter();
    }

    getRouter(){
        const { path, router }  = this.route.initializeRouter();
        // console.log(router)
        this.router.use(path, router);
        // console.log(this.router)
    }

    csvList = (req:Request, res:Response) => {
        console.log('csv Hello World')
        return "Hell World"
    }
}