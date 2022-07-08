import { sign } from "jsonwebtoken";
import router from "../../lib/router";
import * as yup from "yup";
import Database from "../../database/mysql";
import { decrypt } from "../../lib/crypto";
import { RouterContext } from "@koa/router";

const mySecretToken = process.env.TOKEN || "secret_token";

type Auth = {
	id: number;
	nom: string;
	prenom: string;
	etablissement: string;
	email: string;
	password: string;
};

const db = new Database();
router.post("/auth/register", async (ctx: RouterContext) => {
	try {
		const validator = yup.object({
			email: yup.string().email().required(),
			password: yup.string().required(),
		});
		await validator.validate(ctx.request.body).catch((err) => {
			ctx.throw(401, err);
		});
		const wrongUserPassMsg = "Incorrect username and/or password.";
		const { email, password } = ctx.request.body;

		const citoyen = await db
			.query<Auth[]>(
				"SELECT id,nom, prenom, password, etablissement FROM citoyens WHERE email = ?",
				[email]
			)
			.then((citoyens) => ({ ...citoyens[0] }))
			.catch((err) => {
				throw err;
			});
		if (citoyen && Object.keys(citoyen).length !== 0) {
			const result = decrypt(password, citoyen.password);
			if (result) {
				const payload = { sub: citoyen.id };
				const token = sign(payload, mySecretToken);
				ctx.body = {
					id: citoyen.id,
					nom: citoyen.nom,
					prenom: citoyen.prenom,
					etablissement: citoyen.etablissement,
					token,
				};
			} else {
				ctx.throw(401, wrongUserPassMsg);
			}
		} else {
			ctx.throw(401, wrongUserPassMsg);
		}
	} catch (error) {
		ctx.throw(500, `${error}`);
	}
});

export default router;
