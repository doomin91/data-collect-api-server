import { database } from '../../libs/database'

export default class CsvDao {
    tableName = 'csv';
    constructor () {
      let isThereTable
      try { isThereTable = database.prepare(`SELECT * FROM ${this.tableName}`).all(); }        catch (e) { this.createTable(); }
    }

    createTable = () => {
        let sql = `DROP TABLE IF EXISTS ${this.tableName};`;
        database.exec(sql);
        sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (id integer primary key autoincrement, 
                                                            UUID varchar(50) not null,
                                                            phone varchar(20) not null,
                                                            pickup datetime,
                                                            pickup_end datetime,
                                                            delivery datetime,
                                                            delivery_end datetime,
                                                            address_01 varchar(200) not null,
                                                            address_02 varchar(200) not null,
                                                            location varchar(200),
                                                            del_yn char(1) default 'n',
                                                            mod_date timestamp,
                                                            reg_date timestamp default CURRENT_TIMESTAMP
                                                            )`
        database.exec(sql);
      }
}