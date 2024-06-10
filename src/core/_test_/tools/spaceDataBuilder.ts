import { v4 } from "uuid";
import { Space } from "../../entities/space";

type GenerateSpaceInput = {
  spaceId?: string;
  speaker?: string[];
  listener?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export const generateSpace = (input?: GenerateSpaceInput): Space => {
  return new Space({
    spaceId: input?.spaceId ? input.spaceId : v4(),
    speaker: input?.speaker ? input.speaker : ["speaker"],
    listener: input?.listener ? input.listener : ["listener"],
    createdAt: input?.createdAt ? input.createdAt : new Date(),
    updatedAt: input?.updatedAt ? input.updatedAt : new Date(),
  });
};
