import express from "express";
import { accountRouter } from "../routes/account";
import knex from "knex";
import { BCryptGateway } from "../../adapters/gateway/BcryptGateway";
import { SqLTwitterAccountRepository } from "../../adapters/repositories/SQL/SqlTwitterAccountRepository";
import { SqlTwitterAccountMapper } from "../../adapters/repositories/mappers/SqlTwitterAccountMapper";
const request = require('supertest');
const app = express();

describe("E2E - Account", () => {
  beforeAll(async () => {
    app.use(express.json());
    app.use("/accounts", accountRouter);

    const db = knex({
      client: "mysql",
      connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "TWITTER",
      },
    });

    const bcrypt = new BCryptGateway();

    const accountMapper = new SqlTwitterAccountMapper();

    const accountRepo = new SqLTwitterAccountRepository(db, accountMapper);
  });

  it("Should return a status 201 /accounts/signup", function (done) {
    request(app)
      .post("/accounts/signup")
      .send({
        username: "user1",
        email: "lakhdar.azzouz@outlook.fr",
        password: "azerty",
      })
      .set("Accept", "application/json") //Mettre un token si il y'a
      .expect(201)
      .expect((response: any) => {
        console.log(response);
        const responseBody = response.body;
        expect(responseBody.email).toEqual("jojolapin@gmail.com");
      });
  });
});
