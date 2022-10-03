export default class TransactionService {
    dao
    constructor(dao: any) {
        this.dao = dao;
    }

    getTransaction(startDate:string, endDate:string){
        return this.dao.getTransaction(startDate, endDate)
    }

    getTransactionById(id: string){
        return this.dao.getTransactionById(id)
    }

    getHistory(){
        return this.dao.getHistory()
    }
}