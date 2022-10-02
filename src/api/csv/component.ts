import { Request, Response, Router } from 'express';

import fs from 'fs';
import { parse } from 'csv-parse'

import CsvRouter from './route';
import CsvService from './service';
import CsvDao from './dao'

export default class CsvComponent {
    router: Router = Router();
    route: CsvRouter = new CsvRouter(this);
    service: CsvService = new CsvService(new CsvDao())

    constructor () {
        this.getRouter();
    }

    getRouter(){
        const { path, router }  = this.route.initializeRouter();
        this.router.use(path, router);
    }
    
    getService(): CsvService{
        return this.service;
    }
    
    insertDataFromCsvFile = (req: Request, res: Response) => {
        const { fileName } = req.params
        const result = this.getFileContents(fileName)
        return result
    }

    getFileContents = (fileName: string) => {
        const result: string[] = []
        const readStream = fs.createReadStream(`csv_data/${fileName}`)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (row:string[]) => {
            try {
                const chk = this.getService().getTransactionById(row[5])
                if(!chk) {
                    const ins = this.getService().insertCsvData(row)
                    result.push(ins)
                }
            } catch (err) {
                console.log(err)
            }
        })

        return new Promise((resolve, reject) => {
            readStream.on("error", (error) => {
                reject(error.message)
            })

            readStream.on("end", () => {
                resolve(result)
            })
        })
    }
}