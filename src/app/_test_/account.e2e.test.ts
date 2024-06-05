import express from "express";
import { accountRouter } from "../routes/account";
import { BCryptGateway } from "../../adapters/gateway/BcryptGateway";
import { SqLTwitterAccountRepository } from "../../adapters/repositories/SQL/SqlTwitterAccountRepository";
import { SqlTwitterAccountMapper } from "../../adapters/repositories/mappers/SqlTwitterAccountMapper";
import request from "supertest";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { sign } from "jsonwebtoken";

const app = express();

describe("E2E - Account", () => {
  let accountRepository: SqLTwitterAccountRepository;
  let authorization;
  

  beforeAll(async () => {
    app.use(express.json());
    app.use("/accounts", accountRouter);

    const bcrypt = new BCryptGateway();
    const accountMapper = new SqlTwitterAccountMapper();
    accountRepository = new SqLTwitterAccountRepository(dbTest, accountMapper);
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE twitter_account`);
  });

  it("Should return a status 201 /accounts/signup", async () => {
    await request(app)
      .post("/accounts/signup")
      .send({
        username: "user1",
        email: "lakhdar.azzouz@outlook.fr",
        password: "azerty",
      })
      .expect((response: any) => {
        const responseBody = response.body;
        expect(responseBody.username).toEqual("user1");
        expect(responseBody.email).toEqual("lakhdar.azzouz@outlook.fr");
        expect(responseBody.id).toBeDefined();
        expect(responseBody.createdAt).toBeTruthy();
      })
      .expect(201);
  });

  it("Should return a status 201 /accounts/signin", async () => {
    accountRepository.save()
    authorization = sign({
        email: "lakhdar.azzouz@outlook.fr",
        password: "azerty"
      }, "secret");
    await request(app)
      .post("/accounts/signin")
      .set("authorization", authorization) //Mettre le token
      .send({
        email: "lakhdar.azzouz@outlook.fr",
        password: "azerty",
      })
      .expect((response: any) => {
        const responseBody = response.body;
        console.log(response);
        expect(responseBody.email).toEqual("lakhdar.azzouz@outlook.fr");
        expect(responseBody.password).toEqual("azerty");
      })
      .expect(201);
  });

  it("Should return a status 200 /accounts/update", async () => {
    authorization = sign({
        email: "lakhdar.azzouz@outlook.fr",
        password: "azerty",
      }, "secret");
    await request(app)
      .post("/accounts/update")
      .set("authorization", authorization)
      .send({
        id: "id",
        username: "Lakhdar"
      })
      .expect((response: any) => {
        const responseBody = response.body;
        console.log(responseBody)
        expect(responseBody.id).toBeDefined()
        expect(responseBody.username).toEqual("Lakhdar");
      })
      .expect(200)
  });
});
