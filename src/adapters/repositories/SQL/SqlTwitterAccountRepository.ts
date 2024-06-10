import { Knex } from "knex";
import { TwitterAccount } from "../../../core/entities/twitterAccount";
import { TwitterAccountRepository } from "../../../core/repositories/TwitterAccountRepository";
import { SqlTwitterAccountMapper } from "../mappers/SqlTwitterAccountMapper";
import { TwitterAccountModel } from "../models/TwitterAccountModel";

export class SqLTwitterAccountRepository implements TwitterAccountRepository {
  constructor(
    private readonly knex: Knex,
    private readonly twitterAccountMapper: SqlTwitterAccountMapper
  ) {}

  async save(twitterAccount: TwitterAccount): Promise<void> {
    const twitterAccountModel = this.twitterAccountMapper.fromDomain(twitterAccount);
    await this.knex.raw(
      `INSERT INTO twitter_account (username, email, password, id, created_at, updated_at)
    VALUES (:username, :email, :password, :id, :created_at, :updated_at)`,
      {
        username: twitterAccountModel.username,
        email: twitterAccountModel.email,
        password: twitterAccountModel.password,
        id: twitterAccountModel.id,
        created_at: twitterAccountModel.created_at,
        updated_at: twitterAccountModel.updated_at
          ? twitterAccountModel.updated_at
          : null,
      }
    );
  }

  async getById(id: string): Promise<TwitterAccount> {
    const twitterAccountModel = await this.knex.raw<TwitterAccountModel[][]>(
      `SELECT * FROM twitter_account WHERE id = :id LIMIT 1`,
      {
        id: id,
      }
    );
    if (!twitterAccountModel[0][0]) {
      throw new Error("twitter account not found");
    }
    const twitterAccount = this.twitterAccountMapper.toDomain(
      twitterAccountModel[0][0]
    );
    return twitterAccount;
  }

  async getByEmail(email: string): Promise<TwitterAccount | null> {
    const twitterAccountModel = await this.knex.raw<TwitterAccountModel[][]>(
      `SELECT * FROM twitter_account WHERE email = :email LIMIT 1`,
      {
        email: email,
      }
    );
    if (!twitterAccountModel[0][0]) {
      return null;
    }
    const twitterAccount = this.twitterAccountMapper.toDomain(
      twitterAccountModel[0][0]
    );

    return twitterAccount;
  }

  async update(twitterAccount: TwitterAccount): Promise<TwitterAccount> {
    const twitterAccountModel = this.twitterAccountMapper.fromDomain(twitterAccount);
    await this.knex.raw<TwitterAccountModel[][]>(
      `UPDATE twitter_account 
      SET username = :newUsername
      WHERE id = :id`,
      {
        newUsername: twitterAccount.props.username,
        id: twitterAccount.props.id
      }
    );

    const newTwitterAccount = this.twitterAccountMapper.toDomain(twitterAccountModel);

    return newTwitterAccount;
  }
}
