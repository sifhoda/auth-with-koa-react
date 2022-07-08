import { RouterContext } from "@koa/router";
import * as yup from "yup";
import Database from "../../database/mysql";
import { hash } from "../../lib/crypto";
import router from "../../lib/router";

//validateur de données
type Citoyens = {
	id: number;
	nom: string;
	prenom: string;
	cne: string;
	email: string;
	tel: string;
	password: string;
};
type InfoType = {
	fieldCount: number;
	affectedRows: number;
	insertId: number;
	serverStatus: number;
	warningCount: number;
	message: string;
	protocol41: boolean;
	changedRows: number;
};

//initialisation de la base de donnée
const db = new Database();

db.query(`CREATE TABLE IF NOT EXISTS citoyens(
    id INT AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    etablissement VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_valide BOOLEAN DEFAULT FALSE ,
    compte_valide BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    cne VARCHAR(255),
    adresse VARCHAR(255),
    tel INT,
    PRIMARY KEY(id)
)ENGINE=INNODB`);

//Mis en place des routes de l'application
router.get("/", async (ctx: RouterContext) => {
	ctx.body = "Hello world";
});

router.get("/citoyen", async (ctx: RouterContext) => {
	try {
		let sqlQuery = "SELECT * FROM citoyens";
		if (Object.keys(ctx.query).length !== 0) {
			sqlQuery += " WHERE";
			for (
				let index = 0;
				index < Object.keys(ctx.query).length;
				index++
			) {
				const element = ` ${Object.keys(ctx.query)[index]}="${
					Object.values(ctx.query)[index]
				}" ${index === Object.keys(ctx.query).length - 1 ? "" : "and"}`;
				sqlQuery += element;
			}
		}
		const citoyens = await db
			.query<Citoyens[]>(sqlQuery)
			.then((citoyen) => citoyen);

		if (citoyens && citoyens.length !== 0) {
			ctx.body = {
				citoyens,
			};
		} else {
			ctx.body = {
				citoyen: [],
			};
		}
	} catch (error) {
		ctx.throw(500, `error ${error}`);
	}
});

router.get("/citoyen/:id", async (ctx: RouterContext) => {
	try {
		const id = ctx.params.id;
		const validator = yup.number().required();
		await validator.validate(id).catch((err) => {
			throw err;
		});
		const citoyen = await db
			.query<Citoyens[]>("SELECT * FROM citoyens WHERE id = ?", [id])
			.then((citoyens) => ({ ...citoyens[0] }))
			.catch((err) => {
				throw err;
			});

		if (citoyen && Object.keys(citoyen).length !== 0) {
			ctx.body = {
				citoyen,
			};
		} else {
			ctx.throw(404, "citoyen not found");
		}
	} catch (error) {
		ctx.throw(500, `${error}`);
	}
});
router.post("/citoyen", async (ctx: RouterContext) => {
	try {
		const validator = yup.object({
			nom: yup.string().required(),
			prenom: yup.string().required(),
			etablissement: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().required(),
			cne: yup.string().optional(),
			adresse: yup.string().optional(),
			tel: yup.number().min(10).optional(),
		});
		await validator.validate(ctx.request.body).catch((err) => {
			throw err;
		});
		const {
			nom,
			prenom,
			etablissement,
			email,
			password,
			cne,
			adresse,
			tel,
		} = ctx.request.body;
		const hashedPassword = hash(password);
		const citoyen = await db
			.query<InfoType>(
				`INSERT INTO citoyens(nom, prenom, etablissement, email, password, cne, adresse, tel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					nom,
					prenom,
					etablissement,
					email,
					hashedPassword,
					cne,
					adresse,
					tel,
				]
			)
			.then((info) => {
				const citoyen = {
					id: info.insertId,
					nom,
					prenom,
					cne,
					email,
					tel,
					password: hashedPassword,
				};
				return citoyen;
			});
		ctx.body = {
			citoyen,
		};
	} catch (error) {
		ctx.throw(500, `${error}`);
	}
});
router.put("/citoyen/:id", async (ctx: RouterContext) => {
	try {
		const id = ctx.params.id;
		const validator = yup.number().required();
		await validator.validate(id).catch((err) => {
			throw err;
		});
		const citoyen = await db
			.query<Citoyens[]>("SELECT * FROM citoyens WHERE id = ?", [id])
			.then((citoyens) => ({ ...citoyens[0] }))
			.catch((err) => {
				throw err;
			});

		if (citoyen && Object.keys(citoyen).length !== 0) {
			if (Object.keys(ctx.request.body).length !== 0) {
				const args = {
					...citoyen,
					...ctx.request.body,
				};
				if ("password" in ctx.request.body) {
					const { password } = ctx.request.body;
					const hashedPassword = hash(password);
					args.password = hashedPassword;
				}
				await db.query(
					"UPDATE citoyens SET nom=?, prenom=?, cne=?, email=?, tel=?, password=? WHERE id = ?",
					[
						args.nom,
						args.prenom,
						args.cne,
						args.email,
						args.tel,
						args.password,
						args.id,
					]
				);

				ctx.body = {
					citoyen: { ...args },
				};
			} else {
				ctx.body = {
					citoyen,
				};
			}
		} else {
			ctx.throw(404, " not found");
		}
	} catch (error) {
		ctx.throw(500, `${error}`);
	}
});
router.delete("/citoyen/:id", async (ctx: RouterContext) => {
	try {
		const id = ctx.params.id;
		const validator = yup.number().required();
		await validator.validate(id).catch((err) => {
			throw err;
		});
		const citoyen = await db
			.query<Citoyens[]>("SELECT * FROM citoyens WHERE id = ?", [id])
			.then((citoyens) => ({ ...citoyens[0] }))
			.catch((err) => {
				throw err;
			});
		if (citoyen && Object.keys(citoyen).length !== 0) {
			const info = await db
				.query<InfoType>("DELETE FROM citoyens WHERE id = ?", [id])
				.then((info) => info)
				.catch((err) => {
					throw err;
				});

			ctx.body = {
				citoyen,
			};
		} else {
			ctx.throw(404, "Not found");
		}
	} catch (error) {
		ctx.throw(500, `${error}`);
	}
});

export default router;
