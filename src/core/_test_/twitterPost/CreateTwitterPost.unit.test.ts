import { TwitterPost } from "../../entities/twitterPost";
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository";
import { CreateTwitterPost } from "../../usecases/Post/CreateTwitterPost";
import { InMemoryTwitterPostRepository } from "../adapters/repositories/InMemoryTwitterPostRepository";

describe("Unit - Create a Post Twitter", () => {
  let twitterPostRepository: TwitterPostRepository;
  let createTwitterPost: CreateTwitterPost;
  const twitterPostDb = new Map<string, TwitterPost>();
  let twitterPost: TwitterPost;
  const userId = "user_Id";
  const username = "user";
  const post = "post";
  const tag = "tag";

  beforeAll(async () => {
    twitterPostRepository = new InMemoryTwitterPostRepository(twitterPostDb);
    createTwitterPost = new CreateTwitterPost(twitterPostRepository);
    twitterPost = TwitterPost.create({
      userId: userId,
      username: username,
      post: post,
      tag: tag,
    });
    twitterPostRepository.save(twitterPost);
  });

  it("Should return an post with the twitter account", async () => {
    const result = await createTwitterPost.execute({
      userId: userId,
      username: username,
      post: post,
      tag: tag,
    });

    expect(result.props.userId).toEqual(userId);
    expect(result.props.username).toEqual(username);
    expect(result.props.post).toEqual(post);
    expect(result.props.tag).toEqual(tag);
  });

  it("Should throw an error because the character limit of the post must be lower than 280 charactere", async () => {
    const result = createTwitterPost.execute({
      userId: userId,
      username: username,
      post: "Le soleil brillait dans un ciel bleu azur, illuminant la ville endormie. Les rues étaient calmes, seules quelques feuilles dansaient au gré du vent. Les passants pressaient le pas, perdus dans leurs pensées. C'était un matin paisible, où le monde semblait suspendu dans le temps mdr.",
      tag: tag,
    });
    await expect(result).rejects.toThrow("The post must not contain more than 280 characters");
  });
});
