import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";

//Port de l'application
const port = process.env.PORT || 8000;

//dossier contenant les fichiers statiques

app.listen(port, () => {
	console.log(`Acceder au server: http://localhost:${port}`);
});
