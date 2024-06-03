import { TwitterAccount } from "../../../core/entities/twitterAccount";
import { TwitterAccountModel } from "../models/TwitterAccountModel";
import { Mapper } from "./Mapper";

export class SqlTwitterAccountMapper implements Mapper<TwitterAccountModel, TwitterAccount>{
  toDomain(raw: TwitterAccountModel): TwitterAccount {
    const twitterAccount = new TwitterAccount({
      username: raw.username,
      email: raw.email,
      password: raw.password,
      id: raw.id,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
    return twitterAccount;
  }
  fromDomain(data: TwitterAccount): TwitterAccountModel {
    const twitterAccountModel: TwitterAccountModel = {
      username: data.props.username,
      email: data.props.email,
      password: data.props.password,
      id: data.props.id,
      created_at: data.props.createdAt,
      updated_at: data.props.updatedAt,
    };
    return twitterAccountModel;
  }
}
