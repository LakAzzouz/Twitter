import { v4 } from "uuid";

type FollowProperties = {
  idFollow: string;
  followedBy: string;
  userId: string;
  createAt: Date;
  updatedAt?: Date;
};

export class Follow {
  props: FollowProperties;

  constructor(followProperties: FollowProperties) {
    this.props = followProperties;
  }

  static create(props: { followedBy: string; userId: string }): Follow {
    const follow = new Follow({
      idFollow: v4(),
      followedBy: props.followedBy,
      userId: props.userId,
      createAt: new Date(),
    });
    return follow;
  }
}
