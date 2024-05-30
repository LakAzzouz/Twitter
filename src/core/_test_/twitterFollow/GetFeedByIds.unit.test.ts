import { Follow } from "../../entities/follow";
import { TwitterPost } from "../../entities/twitterPost";
import { FollowRepository } from "../../repositories/FollowRepository";
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository";
import { GetFeed } from "../../usecases/Follow/GetFeed";
import { InMemoryFollowRepository } from "../adapters/repositories/InMemoryFollow";
import { InMemoryTwitterPostRepository } from "../adapters/repositories/InMemoryTwitterPostRepository";

describe("Unit - Get Feed By Ids", () => {
  let getFeed: GetFeed;
  let twitterFollowRepository: FollowRepository;
  let twitterPostRepository: TwitterPostRepository;
  const twitterPostDb = new Map<string, TwitterPost>();
  const followDb = new Map<string, Follow>();
  const myUserId = "user_id";
  const username = "toto";
  const post = "post";
  const tag = "#";
  const userWitchIFollow = "followed_id";

  beforeAll(async () => {
    twitterFollowRepository = new InMemoryFollowRepository(followDb);
    twitterPostRepository = new InMemoryTwitterPostRepository(twitterPostDb);
    getFeed = new GetFeed(twitterFollowRepository, twitterPostRepository);
  });

  it("Should return the feed", async () => {
    //Prépare
    const follow = Follow.create({
      followedBy: myUserId,
      userId: userWitchIFollow,
    });
    twitterFollowRepository.save(follow);

    const twitterPost = TwitterPost.create({
      userId: userWitchIFollow,
      username: username,
      post: post,
      tag: tag,
    });
    twitterPostRepository.save(twitterPost);

    //execute
    const result = await getFeed.execute({
      id: myUserId,
    });
    //expect
    expect(result[0].props.userId).toEqual(userWitchIFollow);
  });
});
