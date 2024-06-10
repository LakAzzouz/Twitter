import { Follow } from "../../../core/entities/follow";
import { FollowModel } from "../models/FollowModel";
import { Mapper } from "./Mapper";

export class SqlFollowMapper implements Mapper<FollowModel, Follow> {
  toDomain(raw: FollowModel): Follow {
    const follow = new Follow({
      idFollow: raw.id_follow,
      followedBy: raw.followed_by,
      userId: raw.user_id,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
    return follow;
  }
  fromDomain(data: Follow): FollowModel {
    const followModel: FollowModel = {
      user_id: data.props.userId,
      id_follow: data.props.idFollow,
      followed_by: data.props.followedBy,
      created_at: data.props.createdAt,
      updated_at: data.props.updatedAt,
    };
    return followModel;
  }
}
