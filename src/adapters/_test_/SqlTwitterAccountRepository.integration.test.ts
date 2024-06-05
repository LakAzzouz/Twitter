import { dbTest } from "./tools/dbTest";
import { TwitterAccount } from "../../core/entities/twitterAccount";
import { SqLTwitterAccountRepository } from "../repositories/SQL/SqlTwitterAccountRepository";
import { SqlTwitterAccountMapper } from "../repositories/mappers/SqlTwitterAccountMapper";

describe("Integ - SQL twitter_account Repository", () => {
  let sqlTwitterAccountMapper: SqlTwitterAccountMapper;
  let sqLTwitterAccountRepository: SqLTwitterAccountRepository;
  let twitterAccount: TwitterAccount;
  let twitterAccount2: TwitterAccount;
  const username = "username";
  const email = "toto@gmail.com";
  const password = "password";
  const id = "id";

  beforeAll(async () => {
    sqlTwitterAccountMapper = new SqlTwitterAccountMapper();
    sqLTwitterAccountRepository = new SqLTwitterAccountRepository(
      dbTest,
      sqlTwitterAccountMapper
    );
    twitterAccount = new TwitterAccount({
      username: username,
      email: email,
      password: password,
      id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    twitterAccount2 = new TwitterAccount({
      username: username,
      email: email,
      password: password,
      id: id,
      createdAt: new Date(),
    });
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE twitter_account`);
  });

  it("Should save à twitter account and get it by id", async () => {
    await sqLTwitterAccountRepository.save(twitterAccount);
    const id = twitterAccount.props.id;

    const result = await sqLTwitterAccountRepository.getById(id);

    expect(result.props.id).toEqual(twitterAccount.props.id);
    expect(result.props.username).toEqual(twitterAccount.props.username);
    expect(result.props.email).toEqual(twitterAccount.props.email);
    expect(result.props.password).toEqual(twitterAccount.props.password);
    expect(result.props.createdAt).toBeDefined();
    expect(result.props.updatedAt).toBeDefined();
  });

  it("Should get a twitter account with a mail", async () => {
    await sqLTwitterAccountRepository.save(twitterAccount2);

    const email = twitterAccount2.props.email;

    const result = await sqLTwitterAccountRepository.getByEmail(email);

    if(!result){
      return 
    }
    
    expect(result.props.id).toEqual(twitterAccount2.props.id);
    expect(result.props.username).toEqual(twitterAccount2.props.username);
    expect(result.props.email).toEqual(twitterAccount2.props.email);
    expect(result.props.password).toEqual(twitterAccount2.props.password);
    expect(result.props.createdAt).toBeDefined();
    expect(result.props.updatedAt).toBeFalsy();
  });
});
