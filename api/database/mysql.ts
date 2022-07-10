import * as mysql from "mysql";

//Variables pour la connection
const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;

/**
 * Gestion de la connection et des requetes vers la base de donnée mysql
 * @class Database
 */
class Database {
	private static instance: Database;
	private db;
	private constructor() {
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

	public static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	/**
	 *
	 * @param {string} sql chaine de la requête
	 * @param {string} [args] arguments de la requête
	 * @returns {Promise<T>}
	 */
	query<T>(sql: string, args: Array<any> = []): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			this.db.query(sql, args, (err, rows) => {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			});
		});
	}

	/**
	 * Fermeture de la connection
	 * @returns {Promise<any>}
	 */
	close(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db.end((err) => {
				if (err) {
					return reject(err);
				}
				resolve("connexion fermée");
			});
		});
	}
}
export default Database;
