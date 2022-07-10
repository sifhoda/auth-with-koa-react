import request from "supertest";
import app from "../src/app";
import { describe, expect, it } from "@jest/globals";

describe("app routes test", () => {
	it("Hello world works", async () => {
		const response = await request(app.callback()).get("/");
		expect(response.status).toBe(200);
		expect(response.text).toBe("Hello world");
	});

	it("get all citoyens", async () => {
		const response = await request(app.callback()).get("/citoyen");
		expect(response.status).toBe(200);
		const body = response.body.citoyens;
		expect(body.length).toBe(1);
	});
	it("get one citoyen", async () => {
		const id = 1;
		const response = await request(app.callback()).get(`/citoyen/${id}`);
		expect(response.status).toBe(200);
		const body = response.body.citoyen;
		expect(body.prenom).toBe("Badon");
	});
	it("create a new citoyen", async () => {
		const data = {
			nom: "Maiga",
			prenom: "Lewe",
			etablissement: "High Tech",
			email: "badra@test.ma",
			// password: "2119",
		};
		const response = await request(app.callback())
			.post(`/citoyen/`)
			.send(data);

		expect(response.status).toBe(200);
	});
});
