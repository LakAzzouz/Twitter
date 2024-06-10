import express from "express";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import request from "supertest";
import { sign } from "jsonwebtoken";
import { postRouter } from "../routes/post";
import { SqlTwitterPostRepository } from "../../adapters/repositories/SQL/SqlTwitterPostRepository";
import { generateTwitterAccount } from "../../core/_test_/tools/twitterAccountDataBuilder";
import { BCryptGateway } from "../../adapters/gateway/BcryptGateway";
import { SqLTwitterAccountRepository } from "../../adapters/repositories/SQL/SqlTwitterAccountRepository";
import { TwitterAccount } from "../../core/entities/twitterAccount";
import { SqlTwitterPostMapper } from "../../adapters/repositories/mappers/SqlTwitterPostMapper";
import { SqlTwitterAccountMapper } from "../../adapters/repositories/mappers/SqlTwitterAccountMapper";
import { generatePost } from "../../core/_test_/tools/postDataBuilder";

const app = express();
const jwtSecret = String(process.env.JWT_SECRET);

describe("E2E - Twitter post", () => {
  let twitterPostRepository: SqlTwitterPostRepository;
  let twitterAccountRepository: SqLTwitterAccountRepository;

  let authorization;

  beforeAll(async () => {
    app.use(express.json());
    app.use(postRouter);

    const twitterAccountMapper = new SqlTwitterAccountMapper();
    twitterAccountRepository = new SqLTwitterAccountRepository(
      dbTest,
      twitterAccountMapper
    );

    const twitterPostMapper = new SqlTwitterPostMapper();
    twitterPostRepository = new SqlTwitterPostRepository(
      dbTest,
      twitterPostMapper
    );
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE twitter_post`);
    await dbTest.raw(`TRUNCATE TABLE twitter_account`);
  });

  it("Should return a status 201 /post", async () => {
    const twitterAccount = new TwitterAccount({
      id: "user_id",
      username: "username",
      email: "email",
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await twitterAccountRepository.save(twitterAccount);
    authorization = sign(
      {
        id: twitterAccount.props.id,
        email: twitterAccount.props.email,
      },
      jwtSecret
    );
    await request(app)
      .post("/post")
      .set("authorization", authorization)
      .send({
        username: "user1",
        text: "text",
        tag: "#",
      })
      .expect((response: any) => {
        const responseBody = response.body;
        expect(responseBody.userId).toBeDefined();
        expect(responseBody.username).toEqual("user1");
        expect(responseBody.post).toEqual("text");
        expect(responseBody.tag).toEqual("#");
        expect(responseBody.createdAt).toBeTruthy();
      })
      .expect(201);
  });

  it("Should return a status 200 /post/:id_post", async () => {
    const twitterAccount = new TwitterAccount({
      id: "user_id",
      username: "username",
      email: "email",
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    twitterAccountRepository.save(twitterAccount);

    const twitterPost = generatePost({
      idPost: "id_post",
    });
    await twitterPostRepository.save(twitterPost);
    authorization = sign(
      {
        id: "user_id",
        email: "email",
      },
      jwtSecret
    );
    await request(app)
      .get(`/post/${twitterPost.props.idPost}`)
      .set("authorization", authorization)
      .expect((response: any) => {
        const responseBody = response.body;
        expect(responseBody.id).toEqual(twitterPost.props.idPost);
        expect(responseBody.username).toEqual(twitterPost.props.username);
        expect(responseBody.post).toEqual(twitterPost.props.post);
        expect(responseBody.tag).toEqual(twitterPost.props.tag);
      })
      .expect(200);
  });

  it("Should return a status 200 /tag", async () => {
    const twitterAccount = generateTwitterAccount({
      id: "user_id",
    });

    await twitterAccountRepository.save(twitterAccount);

    const twitterPost1 = generatePost({
      tag: "tag",
    });

    const twitterPost2 = generatePost({
      tag: "tag",
    });

    await twitterPostRepository.save(twitterPost1);
    await twitterPostRepository.save(twitterPost2);

    authorization = sign(
      {
        id: "user_id",
        email: "email",
      },
      jwtSecret
    );
    await request(app)
      .get("/tag")
      .set("authorization", authorization)
      .send({
        tag: "tag",
      })
      .expect((response: any) => {
        const responseBody = response.body;
        expect(responseBody).toHaveLength(2);
      })
      .expect(200);
  });
});
