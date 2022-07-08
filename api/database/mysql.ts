import * as mysql from "mysql";

const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;

class Database {
	private db;
	constructor() {
		this.db = mysql.createPool({
			connectionLimit: 100,
			host: HOST,
			user: USER,
			password: PASSWORD,
			database: DATABASE,
			debug: false,
		});
		this.db.getConnection((err) => {
			if (err) {
				console.log("error ", err);
				throw err;
			} else {
				console.log("connected to database");
			}
		});
	}

	query<T>(sql: string, args: Array<any> = []) {
		return new Promise<T>((resolve, reject) => {
			this.db.query(sql, args, (err, rows) => {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			});
		});
	}

	close() {
		return new Promise((resolve, reject) => {
			this.db.end((err) => {
				if (err) {
					return reject(err);
				}
				resolve(true);
			});
		});
	}
}

export default Database;
