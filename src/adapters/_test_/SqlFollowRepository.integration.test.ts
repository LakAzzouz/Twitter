import { db } from "./tools/db";
import { SqlFollowRepository } from "../repositories/SQL/SqlFollowRepository";
import { SqlFollowMapper } from "../repositories/mappers/SqlFollowMapper";
import { Follow } from "../../core/entities/follow";
import { v4 } from "uuid";

describe("Integ - SQL Follow Repository", () => {
  let sqlFollowMapper: SqlFollowMapper;
  let sqlFollowRepository: SqlFollowRepository;
  let follow: Follow;
  let userId = v4()
  let followedBy = v4()

  beforeAll(async () => {
    sqlFollowMapper = new SqlFollowMapper();
    sqlFollowRepository = new SqlFollowRepository(db, sqlFollowMapper);
    follow = Follow.create({
      followedBy: followedBy,
      userId: userId,
    });
  });

  it("Should save a Follow", async () => {
    await sqlFollowRepository.save(follow);
    await sqlFollowRepository.getById(follow.props.idFollow)
  });
});
