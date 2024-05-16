import { TwitterPost } from "../../entities/twitterPost";
import { TwitterPostRepository } from "../../repositories/TwitterPostRepository";
import { TwitterAccountPost } from "../../usescases/Post/TwitterPost";
import { InMemoryTwitterPostRepository } from "../adapters/InMemoryTwitterPostRepository";

describe('Unit - Create Twitter Account', () => {
    let twitterPostRepository: TwitterPostRepository;
    let createTwitterPost: TwitterAccountPost;
    const twitterPostDb = new Map<string, TwitterPost>();
    let twitterPost: TwitterPost

    beforeAll(async () => {
        twitterPostRepository = new InMemoryTwitterPostRepository(twitterPostDb);
        createTwitterPost = new TwitterAccountPost(twitterPostRepository);
        twitterPost = TwitterPost.create({
            userId: "",
            username: "user1",
            post: "",
            tag: ""
        })
        twitterPostRepository.save(twitterPost);
    })

    it("Should return an post with the twitter account ", async () => {
        const result = await createTwitterPost.execute({
            userId: "",
            username: "user1",
            post: "",
            tag: ""
        })

        expect(result.props.userId).toEqual("") //OK
        expect(result.props.username).toEqual("user1") //OK
        expect(result.props.post).toEqual("") //OK
        expect(result.props.tag).toEqual("") //OK
    })
})