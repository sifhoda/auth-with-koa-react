import koaBody = require("koa-body");
import Koa from "koa";
import serve from "koa-static";
import Cors from "@koa/cors";
import { error } from "../middleware/error";

import citoyenRoutes from "./routes/citoyen";
import authRoutes from "./routes/auth";

const app = new Koa();

app.use(serve("./public"));
app.use(serve("./views", { index: "index.html" }));

//middleware pour la lecture du corps de la requête
app.use(
	koaBody({
		multipart: true,
		formidable: {
			keepExtensions: true,
		},
	})
);

//middleware pour les entêtes CORS
app.use(Cors());

//middleware de la gestion de l'erreur
app.use(error);

//Mis en place des routes de l'application
app.use(citoyenRoutes.routes()).use(citoyenRoutes.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

export default app;
