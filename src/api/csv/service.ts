import Transaction from "./interface/Transaction";

export default class CsvService {
    dao
    constructor(dao: any) {
        this.dao = dao;
    }

    getTransactionById(id: string){
        return this.dao.getTransactionById(id)
    }

    insertCsvData(row: string[]){
        const transaction: Transaction = {
            amount: parseInt(row[0]),
            balance: parseInt(row[1]),
            cancelYn: row[2] == 'Y'? 'Y' : 'N',
            date: row[3],
            storeId: row[4],
            transactionId: row[5]
        }
        return this.dao.insertCsvData(transaction)
    }
}