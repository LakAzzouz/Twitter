import { v4 } from "uuid";

export type TwitterPostProperties = {
  userId: string;
  idPost: string;
  username: string;
  post: string;
  tag: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class TwitterPost {
  props: TwitterPostProperties;

  constructor(twitterPostProperties: TwitterPostProperties) {
    this.props = twitterPostProperties;
  }

  static create(props: {userId: string; username: string; post: string; tag: string;}): TwitterPost {
    const twitterPost = new TwitterPost({
      userId: props.userId,
      idPost: v4(),
      username: props.username,
      post: props.post,
      tag: props.tag,
      createdAt: new Date(),
    });
    return twitterPost;
  }
}
