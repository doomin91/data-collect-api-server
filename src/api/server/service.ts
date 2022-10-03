import Transaction from "./interface/Transaction";
import History from "./interface/History";

export default class ServerService {
    dao
    constructor(dao: any) {
        this.dao = dao;
    }

    getTransactionById(id: string){
        return this.dao.getTransactionById(id)
    }

    insertServerData(row: any){
        const transaction: Transaction = {
            amount: row.amount,
            balance: row.balance,
            cancelYn: row.cancelYn == 'Y'? 'Y':'N',
            date: row.date,
            storeId: row.storeId,
            transactionId: row.transactionId
        }
        return this.dao.insertServerData(transaction)
    }

    insertHistory(data: any){
        const history: History = {
            messageType: data.messageType,
            message: data.message
        }
        return this.dao.insertHistory(history)
    }
}