import { Request, Response, Router } from 'express';

import ServerRouter from './route';
import ServerService from './service';
import ServerDao from './dao'
import axios from 'axios'
import { rejects } from 'assert';

export default class ServerComponent {
    router: Router = Router();
    route: ServerRouter = new ServerRouter(this);
    service: ServerService = new ServerService(new ServerDao())

    constructor () {
        this.getRouter();
    }

    getRouter(){
        const { path, router }  = this.route.initializeRouter();
        this.router.use(path, router);
    }
    
    getService(): ServerService{
        return this.service;
    }

    getDataFromServer = (req:Request, res:Response) => {
        let result:object[] = []
        const { port, page } = req.params
        const request = axios.get(`http://localhost:${port}/transaction?page=${page}`)

        return new Promise((resolve, reject) => {
            request.then((res) => {
                if(res.status == 200){
                    result = res.data.list
                    resolve(res.data.list)
                } else {
                    console.log(res.status)
                }
            })
            request.catch((err) => {
                reject(err)
            })
        })
    }

    insertDataFromServer = (req:Request, res:Response) => {
        let lastTransactionId: string
        const { port } = req.params
        let request = axios.get(`http://localhost:${port}/transaction`)
        let totalPage: number
        
        const promise = new Promise((resolve, reject) => {
            request.then((res) => {
                if(res.status == 200){
                    totalPage = res.data.pageInfo.totalPage
                    resolve(totalPage)
                } else {
                    reject(res)
                }
            })
            request.catch((err) => {
                reject(err)
            })
        })

        return promise.then(() => {
            let update: number = 0;
            let failed: number = 0;
            let nochange: number = 0;
            for(let i=0; i<1; i++){
                let request = axios.get(`http://localhost:${port}/transaction?page=${i}`)
                
                request.then((res) => {
                    if(res.status == 200){
                        res.data.list.forEach((row: any) => {
                            lastTransactionId = row.transactionId
                            const chk = this.getService().getTransactionById(row.transactionId)
                            update++
                            if(!chk){
                                const ins = this.getService().insertServerData(row)
                                if(ins.lastInsertRowid) {
                                    update++
                                    console.log(update)
                                } else {
                                    failed++
                                    console.log(failed)

                                }
                            } else {
                                nochange++
                            }
                        })
                    }
                })
            }

            const history = {
                messageType: failed > 0? 'danger' : 'notice',
                message: `try: ${update+failed+nochange} upt: ${update} failed: ${failed} nochange: ${nochange}, lastTransactionId: ${lastTransactionId}`,
                lastTransactionId: lastTransactionId
            }
            this.getService().insertHistory(history)
            return history
        })
    }

    sleep = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    

}