import knex from "knex";
import { followRouter } from "../routes/follow";
import express from "express";
import request from "supertest";
import { SqlFollowMapper } from "../../adapters/repositories/mappers/SqlFollowMapper";
import { SqlFollowRepository } from "../../adapters/repositories/SQL/SqlFollowRepository";
import { sign } from "jsonwebtoken";
import { generateTwitterAccount } from "../../core/_test_/tools/twitterAccountDataBuilder";
import { SqLTwitterAccountRepository } from "../../adapters/repositories/SQL/SqlTwitterAccountRepository";
import { SqlTwitterAccountMapper } from "../../adapters/repositories/mappers/SqlTwitterAccountMapper";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { generateFollow } from "../../core/_test_/tools/followDataBuilder";
import { generatePost } from "../../core/_test_/tools/postDataBuilder";
import { SqlTwitterPostRepository } from "../../adapters/repositories/SQL/SqlTwitterPostRepository";
import { SqlTwitterPostMapper } from "../../adapters/repositories/mappers/SqlTwitterPostMapper";
import { TwitterPostModel } from "../../adapters/repositories/models/TwitterPostModel";
import { TwitterPostProperties } from "../../core/entities/twitterPost";

const app = express();
const jwtSecret = String(process.env.JWT_SECRET);

describe("E2E - Follow", () => {
let followRepository: SqlFollowRepository
let accountRepository: SqLTwitterAccountRepository;
let twitterPostRepository: SqlTwitterPostRepository
let authorization: any

  beforeAll(async () => {
    app.use(express.json());
    app.use(followRouter);

    const followMapper = new SqlFollowMapper();
    followRepository = new SqlFollowRepository(dbTest, followMapper);
    accountRepository = new SqLTwitterAccountRepository(dbTest, new SqlTwitterAccountMapper())

    const twitterPostMapper = new SqlTwitterPostMapper();
    twitterPostRepository = new SqlTwitterPostRepository(dbTest, twitterPostMapper)

  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE twitter_account`);
    await dbTest.raw(`TRUNCATE TABLE follows`);
    await dbTest.raw(`TRUNCATE TABLE twitter_post`);
  });

  it("Should return a status 201 /follow", async () => {
    authorization = sign({
        id: "user_id",
        email: "toto@gmail.com"
    }, jwtSecret)
    await request(app)
      .post("/follow")
      .set("authorization", authorization)
      .send({
        followedBy: "id",
      })
      .expect((response: any) => {
          const responseBody = response.body;
          expect(responseBody.followedBy).toEqual("id");
        })
        .expect(201)
  });

  
  it("Should return a status 200 /follow/:idFollow", async () => {
    const user1 = generateTwitterAccount({
      id: "id1"
    })

    const user2 = generateTwitterAccount({
      id: "id2"
    })

    const _ = [user1, user2].forEach((elm) => accountRepository.save(elm))

    const follow = generateFollow({
      userId: user1.props.id,
      followedBy: user2.props.id
    })

    await followRepository.save(follow)

    authorization = sign({
      id: user1.props.id,
      email: user1.props.email
    }, jwtSecret)
    await request(app)
      .get(`/follow/${follow.props.idFollow}`)
      .set("authorization", authorization)
      .expect((response: any) => {
        const responseBody = response.body;
        expect(responseBody.userId).toEqual(user1.props.id);
        expect(responseBody.followedBy).toEqual(user2.props.id);
      })
      .expect(200)
  });

  it("Should return a status 200 /feed/:id", async () => {
    const user1 = generateTwitterAccount({
      id: "Lakhdar"
    })

    const user2 = generateTwitterAccount({
      id: "Messi"
    })

    const user3 = generateTwitterAccount({
      id: "Benzema"
    })

    const follow1 = generateFollow({
      followedBy: user1.props.id,
      userId: user2.props.id
    })

    const follow2 = generateFollow({
      followedBy: user1.props.id,
      userId: user3.props.id
    })

    await followRepository.save(follow1)
    await followRepository.save(follow2)

    const post1 = generatePost({
      userId: user2.props.id,
    })

    const post2 = generatePost({
      userId: user3.props.id,
    })

    await twitterPostRepository.save(post1)
    await twitterPostRepository.save(post2)

    authorization = sign({
      id: user1.props.id,
      email: user1.props.email
    }, jwtSecret)

    await request(app)
      .get("/feed")
      .set("authorization", authorization)

      .expect((response: any) => {
        const responseBody: TwitterPostProperties[] = response.body;
        expect(responseBody).toHaveLength(2);
        const user3Posts = responseBody.filter((elm) => elm.userId === user3.props.id)
        expect(user3Posts[0].userId).toEqual(user3.props.id)
      })
      .expect(200)
  });
});
