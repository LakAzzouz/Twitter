import { Follow } from "../../entities/follow";
import { v4 } from "uuid";

type GenerateFollowInput = {
  idFollow?: string;
  followedBy?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const generateFollow = (input?: GenerateFollowInput): Follow => {
  return new Follow({
    idFollow: input?.idFollow ? input.idFollow : v4(),
    followedBy: input?.followedBy ? input.followedBy : v4(),
    userId: input?.userId ? input.userId : v4(),
    createdAt: input?.createdAt ? input.createdAt : new Date(),
    updatedAt: input?.updatedAt ? input.updatedAt : new Date(),
  });
};
