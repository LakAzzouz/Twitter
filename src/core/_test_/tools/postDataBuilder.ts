import { v4 } from "uuid";
import { TwitterPost } from "../../entities/twitterPost";
import { faker } from "@faker-js/faker";

type GeneratePostInput = {
  userId?: string;
  idPost?: string;
  username?: string;
  post?: string;
  tag?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const generatePost = (input?: GeneratePostInput): TwitterPost => {
  return new TwitterPost({
    userId: input?.userId ? input?.userId : v4(),
    idPost: input?.idPost ? input?.idPost : v4(),
    username: input?.username ? input?.username : faker.internet.userName(),
    post: input?.post ? input?.post : faker.word.words(),
    tag: input?.tag ? input?.tag : "#",
    createdAt: input?.createdAt ? input.createdAt : new Date(),
    updatedAt: input?.updatedAt ? input.updatedAt : new Date(),
  });
};
