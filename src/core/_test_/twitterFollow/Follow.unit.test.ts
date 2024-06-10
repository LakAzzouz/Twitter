import { Follow } from "../../entities/follow";
import { FollowRepository } from "../../repositories/FollowRepository";
import { FollowAccount } from "../../usecases/Follow/FollowAccount";
import { InMemoryFollowRepository } from "../adapters/repositories/InMemoryFollowRepository";

describe("Unit - Create an Follow", () => {
  let followAccount: FollowAccount;
  let twitterFollowRepository: FollowRepository;
  const followDb = new Map<string, Follow>();
  const followedBy = "user";
  const userId = "user2";

  beforeAll(async () => {
    twitterFollowRepository = new InMemoryFollowRepository(followDb);
    followAccount = new FollowAccount(twitterFollowRepository);
  });

  it("Should return a follow", async () => {
    const follow = await followAccount.execute({
      followedBy: followedBy,
      userId: userId,
    });
    expect(follow.props.idFollow).toBeDefined();
    expect(follow.props.createdAt).toBeDefined();
    expect(follow.props.followedBy).toEqual(followedBy);
    expect(follow.props.userId).toEqual(userId);
  });
});
