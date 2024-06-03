import { dbTest } from "./tools/dbTest";
import { SqlFollowRepository } from "../repositories/SQL/SqlFollowRepository";
import { SqlFollowMapper } from "../repositories/mappers/SqlFollowMapper";
import { Follow } from "../../core/entities/follow";
import { v4 } from "uuid";

describe("Integ - SQL Follow Repository", () => {
  let sqlFollowMapper: SqlFollowMapper;
  let sqlFollowRepository: SqlFollowRepository;
  let follow: Follow;
  const followedBy = "followed_by";
  const userId = "user_id";
  const idFollow = "id_follow";

  beforeAll(async () => {
    sqlFollowMapper = new SqlFollowMapper();
    sqlFollowRepository = new SqlFollowRepository(dbTest, sqlFollowMapper);
    follow = new Follow({
      followedBy: followedBy,
      userId: userId,
      idFollow: idFollow,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE follows`);
  });

  it("Should save a Follow an get it by id", async () => {
    await sqlFollowRepository.save(follow);
    const idFollow = follow.props.idFollow;

    const result = await sqlFollowRepository.getById(idFollow);

    expect(result.props.userId).toEqual(follow.props.userId);
    expect(result.props.followedBy).toEqual(follow.props.followedBy);
    expect(result.props.idFollow).toEqual(follow.props.idFollow);
    expect(result.props.createdAt).toBeDefined();
    expect(result.props.updatedAt).toBeDefined();
  });

  it("Should get followeds by ids", async () => {
    // prépare
    const follow1 = new Follow({
      followedBy: followedBy,
      userId: "user_id1",
      idFollow: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const follow2 = new Follow({
      followedBy: followedBy,
      userId: "user_id2",
      idFollow: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await sqlFollowRepository.save(follow1);
    await sqlFollowRepository.save(follow2);

    // execute
    const idsArray = await sqlFollowRepository.getFollowedIds(followedBy);

    // expect
    expect(idsArray).toHaveLength(2)
    expect(idsArray).toContain(follow1.props.userId)
    expect(idsArray).toContain(follow2.props.userId)
  });
});
