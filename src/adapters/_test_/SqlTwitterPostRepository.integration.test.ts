import { dbTest } from "../_test_/tools/dbTest";
import { TwitterPost } from "../../core/entities/twitterPost";
import { SqlTwitterPostRepository } from "../repositories/SQL/SqlTwitterPostRepository";
import { SqlTwitterPostMapper } from "../repositories/mappers/SqlTwitterPostMapper";

describe("Integ - SQL Twitter_post Repository", () => {
  let sqlTwitterPostMapper: SqlTwitterPostMapper;
  let sqlTwitterPostRepository: SqlTwitterPostRepository;
  let twitterPost: TwitterPost;
  const userId = "user_id";
  const username = "username";
  const post = "post";
  const tag = "tag";
  const idPost = "id_post";

  beforeAll(async () => {
    sqlTwitterPostMapper = new SqlTwitterPostMapper();
    sqlTwitterPostRepository = new SqlTwitterPostRepository(
      dbTest,
      sqlTwitterPostMapper
    );
    twitterPost = new TwitterPost({
      userId: userId,
      idPost: idPost,
      username: username,
      post: post,
      tag: tag,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE twitter_post`);
  });

  it("Should save a twitter post and get it by id", async () => {
    await sqlTwitterPostRepository.save(twitterPost);
    const id = twitterPost.props.idPost;

    const result = await sqlTwitterPostRepository.getById(id);

    expect(result.props.idPost).toEqual(twitterPost.props.idPost);
    expect(result.props.userId).toEqual(twitterPost.props.userId);
    expect(result.props.username).toEqual(twitterPost.props.username);
    expect(result.props.post).toEqual(twitterPost.props.post);
    expect(result.props.tag).toEqual(twitterPost.props.tag);
    expect(result.props.createdAt).toBeDefined();
    expect(result.props.updatedAt).toBeDefined();
  });

  it("Should get an array of twitter posts by tag", async () => {
    await sqlTwitterPostRepository.save(twitterPost);

    const tag = twitterPost.props.tag;

    const arrayTwitterPost = await sqlTwitterPostRepository.selectPostByTag(tag);

    const result = arrayTwitterPost[0];

    expect(result.props.idPost).toEqual(twitterPost.props.idPost);
    expect(result.props.userId).toEqual(twitterPost.props.userId);
    expect(result.props.username).toEqual(twitterPost.props.username);
    expect(result.props.post).toEqual(twitterPost.props.post);
    expect(result.props.tag).toEqual(twitterPost.props.tag);
    expect(result.props.createdAt).toBeDefined();
    expect(result.props.updatedAt).toBeDefined();
  });
});
