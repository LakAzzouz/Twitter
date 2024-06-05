import knex from "knex";
import { followRouter } from "../routes/follow";
import express from "express";
import request from "supertest";
import { SqlFollowMapper } from "../../adapters/repositories/mappers/SqlFollowMapper";
import { SqlFollowRepository } from "../../adapters/repositories/SQL/SqlFollowRepository";
import { sign } from "jsonwebtoken";

const app = express();

describe("E2E - Follow", () => {
let followRepository: SqlFollowRepository
let authorization

  beforeAll(async () => {
    app.use(express.json());
    app.use(followRouter);

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
    const followMapper = new SqlFollowMapper();
    followRepository = new SqlFollowRepository(db, followMapper);
  });

  it("Should return a status 201 /follow", async () => {
    authorization = sign({
        id: "user_id",
        email: "toto@gmail.com"
    }, "secret")
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
    request(app)
      .post("/follow/:idFollow")
      .set("Accept", "application/json")
      .expect(200)
      .expect((response: any) => {
        const responseBody = response.body;
        expect(responseBody.followedBy).toEqual("id");
      });
  });

  it("Should return a status 200 /feed/:id", async () => {
    request(app)
      .post("/follow/:id")
      .set("Accept", "application/json")
      .expect(200)
      .expect((response: any) => {
        const responseBody = response.body;
        expect(responseBody.followedBy).toEqual("id");
      });
  });
});
