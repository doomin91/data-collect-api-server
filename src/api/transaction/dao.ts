import { database } from '../../libs/database'

export default class TransactionDao {
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

    getTransaction = () => {
        const sql = database.prepare(`SELECT * FROM ${this.tableName};`);
        const result = sql.all();
        return result;
    }

    getTransactionById = (id: string) => {
        const sql = database.prepare(`SELECT * FROM ${this.tableName} WHERE transactionId = ?;`);
        const result = sql.get(id);
        return result;
    }
}    