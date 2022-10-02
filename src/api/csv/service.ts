export default class CsvService {
    dao
    constructor(dao: any) {
        this.dao = dao;
    }

    csvList(){
        return this.dao.csvList()
    }
}