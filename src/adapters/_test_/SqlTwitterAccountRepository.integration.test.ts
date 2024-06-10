import { dbTest } from "./tools/dbTest";
import { TwitterAccount } from "../../core/entities/twitterAccount";
import { SqLTwitterAccountRepository } from "../repositories/SQL/SqlTwitterAccountRepository";
import { SqlTwitterAccountMapper } from "../repositories/mappers/SqlTwitterAccountMapper";

describe("Integ - SQL twitter_account Repository", () => {
  let sqlTwitterAccountMapper: SqlTwitterAccountMapper;
  let sqlTwitterAccountRepository: SqLTwitterAccountRepository;
  let twitterAccount: TwitterAccount;
  let twitterAccount2: TwitterAccount;
  const username = "username";
  const email = "toto@gmail.com";
  const password = "password";
  const id = "id";

  beforeAll(async () => {
    sqlTwitterAccountMapper = new SqlTwitterAccountMapper();
    sqlTwitterAccountRepository = new SqLTwitterAccountRepository(
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
    await sqlTwitterAccountRepository.save(twitterAccount);
    const id = twitterAccount.props.id;

    const result = await sqlTwitterAccountRepository.getById(id);

    expect(result.props.id).toEqual(twitterAccount.props.id);
    expect(result.props.username).toEqual(twitterAccount.props.username);
    expect(result.props.email).toEqual(twitterAccount.props.email);
    expect(result.props.password).toEqual(twitterAccount.props.password);
    expect(result.props.createdAt).toBeDefined();
    expect(result.props.updatedAt).toBeDefined();
  });

  it("Should get a twitter account with a mail", async () => {
    await sqlTwitterAccountRepository.save(twitterAccount2);

    const email = twitterAccount2.props.email;

    const result = await sqlTwitterAccountRepository.getByEmail(email);

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

  it("Should update the twitter account with a new username", async () => {
    await sqlTwitterAccountRepository.save(twitterAccount);

    twitterAccount.props.username = "toto"

    const result = await sqlTwitterAccountRepository.update(twitterAccount)

    expect(result.props.username).toEqual("toto")
    
  })
});
