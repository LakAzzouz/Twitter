import { TwitterPost } from "../../../core/entities/twitterPost";
import { TwitterPostModel } from "../models/TwitterPostModel";
import { Mapper } from "./Mapper";

export class SqlTwitterPostMapper implements Mapper<TwitterPostModel, TwitterPost>{
    toDomain(raw: TwitterPostModel): TwitterPost {
        const twitterPost = new TwitterPost({
            userId: raw.user_id,
            idPost: raw.id_post,
            username: raw.username,
            post: raw.post,
            tag: raw.tag,
            createdAt: raw.created_at,
            updatedAt: raw.updated_at
        });
        return twitterPost
    }
    fromDomain(data: TwitterPost): TwitterPostModel {
        const twitterPostModel: TwitterPostModel = {
            user_id: data.props.userId,
            id_post: data.props.idPost,
            username: data.props.username,
            post: data.props.post,
            tag: data.props.tag,
            created_at: data.props.createdAt,
            updated_at: data.props.updatedAt
        }
        return twitterPostModel
    }
}