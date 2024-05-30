import { TwitterPost } from "../../entities/twitterPost";
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository";
import { TwitterGet } from "../../usecases/Post/GetTwitterPostById";
import { InMemoryTwitterPostRepository } from "../adapters/repositories/InMemoryTwitterPostRepository";

describe("Unit - Twitter Get Post By Id", () => {
  let twitterPostRepository: TwitterPostRepository;
  const twitterPostDb = new Map<string, TwitterPost>();
  let twitterGet: TwitterGet;
  const userId = "user_id";
  const idPost = "id_post";
  const username = "user";
  const post = "post";
  const tag = "#";

  beforeAll(async () => {
    twitterPostRepository = new InMemoryTwitterPostRepository(twitterPostDb);
    twitterGet = new TwitterGet(twitterPostRepository);
  });

  it("Sould get twitter post by id", async () => {
    const twitterPost = new TwitterPost({
      userId: userId,
      idPost: idPost,
      username: username,
      post: post,
      tag: tag,
      createdAt: new Date(),
    });
    twitterPostDb.set(twitterPost.props.idPost, twitterPost);

    const result = await twitterGet.execute({
      idPost: idPost,
    });
    expect(result.props.userId).toEqual(userId);
    expect(result.props.idPost).toEqual(idPost);
    expect(result.props.username).toEqual(username);
    expect(result.props.post).toEqual(post);
    expect(result.props.tag).toEqual(tag);
    expect(result.props.createdAt).toBeDefined();
  });
});
