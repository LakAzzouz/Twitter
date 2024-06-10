import { SqlSpaceRepository } from "../../adapters/repositories/SQL/SqlSpaceRepository";
import express from "express";
import { spaceRouteur } from "../routes/space";
import { SqlSpaceMapper } from "../../adapters/repositories/mappers/SqlSpaceMapper";
import dbConfig from "../config/dbConfig";
import request from "supertest";
import { generateTwitterAccount } from "../../core/_test_/tools/twitterAccountDataBuilder";
import { sign } from "jsonwebtoken";
import { generateSpace } from "../../core/_test_/tools/spaceDataBuilder";

const jwtSecret = String(process.env.JWT_SECRET);
const app = express();

describe("E2E - Space", () => {
  let spaceRepository: SqlSpaceRepository;
  let authorization;

  beforeAll(async () => {
    app.use(express.json());
    app.use(spaceRouteur);

    const spaceMapper = new SqlSpaceMapper();
    spaceRepository = new SqlSpaceRepository(dbConfig, spaceMapper);
  });

  beforeEach(async () => {
    await dbConfig.raw(`TRUNCATE TABLE space`);
  });

  it("Should return a status 201 /space", async () => {
    const twitterAccount1 = generateTwitterAccount({
      id: "id1",
      email: "email1",
    });

    authorization = sign(
      {
        id: twitterAccount1.props.id,
        email: twitterAccount1.props.email,
      },
      jwtSecret
    );

    await request(app)
      .post("/space")
      .set("authorization", authorization)
      .send({
        speaker: "speaker",
        listener: "listener",
      })
      .expect((response: any) => {
        const responseBody = response.body;
        expect(responseBody.speaker).toEqual("speaker");
        expect(responseBody.listener).toEqual("listener");
      })
      .expect(201);
  });

  it("Should return a status 200 /space/:spaceId", async () => {
    const twitterAccount1 = generateTwitterAccount({
      id: "id1",
      email: "email1",
    });

    const space = generateSpace({
      speaker: ["speaker"],
      listener: ["listener"],
      spaceId: "spaceId",
    });

    await spaceRepository.save(space);

    authorization = sign(
      {
        id: twitterAccount1.props.id,
        email: twitterAccount1.props.email,
      },
      jwtSecret
    );
 
    await request(app)
      .get("/space/spaceId")
      .set("authorization", authorization)
      .expect((response: any) => {
        const responseBody = response.body;
        console.log(responseBody);
        expect(responseBody.speaker).toHaveLength(1);
        expect(responseBody.listener).toHaveLength(1);
        expect(responseBody.speaker).toEqual(["speaker"]);
        expect(responseBody.listener).toEqual(["listener"]);
        expect(responseBody.createdAt).toBeDefined();
      })
      .expect(200);
  });

//    it("Should return a status 200 /space/:spaceId", async () => {
//     const twitterAccount1 = generateTwitterAccount({
//       id: "id1",
//       email: "email1",
//     });

//     const space = generateSpace({
//       speaker: ["speaker"],
//       listener: ["listener"],
//       spaceId: "spaceId",
//     });

//     await spaceRepository.save(space);

//     authorization = sign(
//       {
//         id: twitterAccount1.props.id,
//         email: twitterAccount1.props.email,
//       },
//       jwtSecret
//     );
//     await request(app)
//       .patch("/space/spaceId")
//       .set("authorization", authorization)
//       .send({
//         speaker: ["speaker2"],
//         listener: ["listener2"]
//       })
//       .expect((response: any) => {
//         const responseBody = response.body;
//         expect(responseBody.speaker).toHaveLength(2);
//         expect(responseBody.listener).toHaveLength(2);
//       })
//       .expect(200);
//   });
});
