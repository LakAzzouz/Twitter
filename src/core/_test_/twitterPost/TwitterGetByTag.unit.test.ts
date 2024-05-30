import { TwitterPost } from "../../entities/twitterPost";
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository";
import { TwitterPostGetByTag } from "../../usecases/Post/GetTwitterPostByTag";
import { InMemoryTwitterPostRepository } from "../adapters/repositories/InMemoryTwitterPostRepository";

describe("Unit - Twitter Get Post By Tag", () => {
  let twitterPostRepository: TwitterPostRepository;
  let twitterGetbyTag: TwitterPostGetByTag;
  const twitterPostDb = new Map<string, TwitterPost>();
  const tag = "#";
  const userId = "user_id";
  const idPost = "id_post";
  const username = "user";
  const post = "post";

  beforeAll(async () => {
    twitterPostRepository = new InMemoryTwitterPostRepository(twitterPostDb);
    twitterGetbyTag = new TwitterPostGetByTag(twitterPostRepository);
  });

  it("Should get twitter post by tag", async () => {
    const twitterPost = new TwitterPost({
      userId: userId,
      idPost: idPost,
      username: username,
      post: post,
      tag: tag,
      createdAt: new Date(),
    });
    twitterPostDb.set(twitterPost.props.idPost, twitterPost);

    const result = await twitterGetbyTag.execute({
      tag: tag,
    });
    expect(result[0].props.tag).toEqual(tag);
  });
});
