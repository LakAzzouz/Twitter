import { dbTest } from "../_test_/tools/dbTest";
import { TwitterPost } from "../../core/entities/twitterPost";
import { SqlTwitterPostRepository } from "../repositories/SQL/SqlTwitterPostRepository";
import { SqlTwitterPostMapper } from "../repositories/mappers/SqlTwitterPostMapper";

describe("Integ - SQL Twitter_post Repository", () => {
  let sqlTwitterPostMapper: SqlTwitterPostMapper;
  let sqlTwitterPostRepository: SqlTwitterPostRepository;
  let twitterPost: TwitterPost;


  beforeAll(async () => {
    sqlTwitterPostMapper = new SqlTwitterPostMapper();
    sqlTwitterPostRepository = new SqlTwitterPostRepository(
      dbTest,
      sqlTwitterPostMapper
    );
    twitterPost = new TwitterPost({
      userId: "user_id",
      idPost: "id_post",
      username: "username",
      post: "post",
      tag: "tag",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
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

  it("Should get an array of twitter posts by ids", async () => {
    await sqlTwitterPostRepository.save(twitterPost)

    const twitterPost2 = new TwitterPost({
      userId: "user_id2",
      idPost: "id_post2",
      username: "username2",
      post: "post2",
      tag: "tag2",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    })

    await sqlTwitterPostRepository.save(twitterPost2)

    const arrayTwitterPost = await sqlTwitterPostRepository.getByFollowedIds(["user_id", "user_id2"])

    const post1 = arrayTwitterPost.filter((elm) => elm.props.userId === "user_id")

    const post2 = arrayTwitterPost.filter((elm) => elm.props.userId === "user_id2")

    expect(arrayTwitterPost).toHaveLength(2)
    expect(post1[0].props.userId).toEqual("user_id")
    expect(post2[0].props.userId).toEqual("user_id2")
    expect(post1[0]).toEqual(twitterPost)
    expect(post2[0]).toEqual(twitterPost2)

  })
});
