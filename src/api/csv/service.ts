export default class CsvService {
    dao
    constructor(dao: any) {
        this.dao = dao;
    }

    getTransactionById(id: string){
        return this.dao.getTransactionById(id)
    }

    insertCsvData(row: string[]){
        return this.dao.insertCsvData(row)
    }
}