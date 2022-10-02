export default class TransactionService {
    dao
    constructor(dao: any) {
        this.dao = dao;
    }

    getTransaction(){
        return this.dao.getTransaction()
    }

    getTransactionById(id: string){
        return this.dao.getTransactionById(id)
    }
}