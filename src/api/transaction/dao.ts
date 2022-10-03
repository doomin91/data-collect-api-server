import { database } from '../../libs/database'

export default class TransactionDao {
    tableName = 'merge_transaction';
    constructor () {
      let isThereTable
      try { isThereTable = database.prepare(`SELECT * FROM ${this.tableName}`).all(); }        catch (e) { this.createTable(); }
      try { isThereTable = database.prepare(`SELECT * FROM ${this.tableName}_history`).all(); }        catch (e) { this.createHistoryTable(); }
    }

    createTable = () => {
        let sql = `DROP TABLE IF EXISTS ${this.tableName};`;
        database.exec(sql);
        sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (id integer primary key autoincrement, 
                                                            amount integer(6),
                                                            balance integer(4),
                                                            cancelYn char(1) default 'n',
                                                            storeId varchar(10),
                                                            date date,
                                                            transactionId varchar(30),
                                                            productId varchar(20),
                                                            regDate timestamp default CURRENT_TIMESTAMP
                                                            )`
        database.exec(sql);
    }

    createHistoryTable = () => {
        let sql = `DROP TABLE IF EXISTS ${this.tableName};`;
        database.exec(sql);
        sql = `CREATE TABLE IF NOT EXISTS ${this.tableName}_history (id integer primary key autoincrement, 
                                                            messageType varchar(10),
                                                            message varchar(200),
                                                            regDate timestamp default CURRENT_TIMESTAMP
                                                            )`
        database.exec(sql);
    }

    getTransaction = (startDate: string, endDate: string) => {
        const sql = database.prepare(`SELECT * FROM ${this.tableName} WHERE date >= '${startDate}' and date < '${endDate}';`);
        const result = sql.all();
        return result;
    }

    getTransactionById = (id: string) => {
        const sql = database.prepare(`SELECT * FROM ${this.tableName} WHERE transactionId = ?;`);
        const result = sql.get(id);
        return result;
    }

    getHistory = () => {
        const sql = database.prepare(`SELECT * FROM ${this.tableName}_history`);
        const result = sql.all();
        return result;
    }
}    