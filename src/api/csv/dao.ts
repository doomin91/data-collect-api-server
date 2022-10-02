import { database } from '../../libs/database'

export default class CsvDao {
    tableName = 'mergeTransaction';
    constructor () {
      let isThereTable
      try { isThereTable = database.prepare(`SELECT * FROM ${this.tableName}`).all(); }        catch (e) { this.createTable(); }
    }

    createTable = () => {
        let sql = `DROP TABLE IF EXISTS ${this.tableName};`;
        database.exec(sql);
        sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (id integer primary key autoincrement, 
                                                            amount varchar(6),
                                                            balance varchar(4),
                                                            cancelYn char(1) default 'n',
                                                            storeId varchar(10),
                                                            date date,
                                                            transactionId varchar(30),
                                                            productId varchar(20),
                                                            reg_date timestamp default CURRENT_TIMESTAMP
                                                            )`
        database.exec(sql);
    }

    getTransactionById = (id: string) => {
        const sql = database.prepare(`SELECT * FROM ${this.tableName} WHERE transactionId = ?;`);
        const result = sql.get(id);
        return result;
    }

    insertCsvData = (row: string[]) => {
        const sql = database.prepare(`INSERT INTO ${this.tableName} (amount, balance, cancelYn, date, storeId, transactionId) VALUES (
            ?, ?, ?, ?, ?, ?)`);
        const result = sql.run(row[0], row[1], row[2], row[3], row[4], row[5])
        return result
    }
}    