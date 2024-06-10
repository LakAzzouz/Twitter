import { faker } from "@faker-js/faker";
import { TwitterAccount } from "../../entities/twitterAccount";
import { v4 } from "uuid";

type GenerateTwitterAccountInput = {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const generateTwitterAccount = (input?: GenerateTwitterAccountInput): TwitterAccount => {
  return new TwitterAccount({
    id: input?.id ? input.id : v4(),
    email: input?.email ? input.email : faker.internet.email(),
    username: input?.username ? input.username : faker.internet.userName(),
    password: input?.password ? input.password : faker.internet.password(),
    createdAt: input?.createdAt ? input.createdAt : new Date(),
    updatedAt: input?.updatedAt ? input.updatedAt : new Date(),
  });
};
