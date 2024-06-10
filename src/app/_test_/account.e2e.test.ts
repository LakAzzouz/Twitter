import express from "express";
import { accountRouter } from "../routes/account";
import { BCryptGateway } from "../../adapters/gateway/BcryptGateway";
import { SqLTwitterAccountRepository } from "../../adapters/repositories/SQL/SqlTwitterAccountRepository";
import { SqlTwitterAccountMapper } from "../../adapters/repositories/mappers/SqlTwitterAccountMapper";
import request from "supertest";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { sign } from "jsonwebtoken";
import { generateTwitterAccount } from "../../core/_test_/tools/twitterAccountDataBuilder";

const app = express();
const bcrypt = new BCryptGateway()

describe("E2E - Account", () => {
  let accountRepository: SqLTwitterAccountRepository;
  let authorization;
  

  beforeAll(async () => {
    app.use(express.json());
    app.use("/accounts", accountRouter);

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

  it("Should return a status 200 /accounts/signin", async () => {
    const twitterAccount = generateTwitterAccount({
      email: "lakhdar.azzouz@outlook.fr",
      password: bcrypt.hashPassword("azerty", 10)
    })
    accountRepository.save(twitterAccount)
    await request(app)
      .post("/accounts/signin")
      .send({
        email: "lakhdar.azzouz@outlook.fr",
        password: "azerty",
      })
      .expect((response: any) => {
        const responseBody = response.body;
        expect(responseBody.result).toEqual(`Welcome to Twitter ${twitterAccount.props.username}`);
        expect(responseBody.token).toBeDefined()
      })
      .expect(200);
  });

  it("Should return a status 200 /accounts/update", async () => {
    const twitterAccount = generateTwitterAccount({
      email: "lakhdar.azzouz@outlook.fr",
      password: bcrypt.hashPassword("azerty", 10)
    })
    accountRepository.save(twitterAccount)
    authorization = sign({
        id: twitterAccount.props.id,
        email: twitterAccount.props.email
    }, "secret");
    await request(app)
      .patch("/accounts/update")
      .set("authorization", authorization)
      .send({
        username: "Lakhdar"
      })
      .expect((response: any) => {
        const responseBody = response.body;
        expect(responseBody.id).toBeDefined()
        expect(responseBody.username).toEqual("Lakhdar");
      })
      .expect(200)
  });
});
