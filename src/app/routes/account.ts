require("dotenv").config();
const jwt = require("jsonwebtoken");

import express from "express";
import { TwitterAccount } from "../../core/entities/twitterAccount";
import { BCryptGateway } from "../../adapters/gateway/BcryptGateway";
import { Auth, RequestAuth } from "../middlewares/auth";
import { CreateTwitterAccount } from "../../core/usecases/Account/CreateTwitterAccount";
import { SignInTwitterAccount } from "../../core/usecases/Account/SignInTwitterAccount";
import { UpdateTwitterAccount } from "../../core/usecases/Account/UpdateTwitterAccount";
import { InMemoryTwitterAccountRepository } from "../../adapters/repositories/inMemory/InMemoryTwitterAccountRepository";
import { SqLTwitterAccountRepository } from "../../adapters/repositories/SQL/SqlTwitterAccountRepository";
import { db } from "../..";
import { SqlTwitterAccountMapper } from "../../adapters/repositories/mappers/SqlTwitterAccountMapper";

export const accountRouter = express.Router();

export const twitterAccountMap = new Map<String, TwitterAccount>();

const jwtSecret = process.env.JWT_SECRET;
const inMemoryTwitterRepository = new InMemoryTwitterAccountRepository(twitterAccountMap);
const accoutMapper = new SqlTwitterAccountMapper()
const sqlTwitterAccountRepository = new SqLTwitterAccountRepository(db, accoutMapper)
const bcrypt = new BCryptGateway();
const createTwitterAccount = new CreateTwitterAccount(bcrypt, sqlTwitterAccountRepository);
const signInTwitterAccount = new SignInTwitterAccount(bcrypt, sqlTwitterAccountRepository);
const updateAccount = new UpdateTwitterAccount(sqlTwitterAccountRepository);

accountRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { username, email, password } = body;

    const twitterAccount = await createTwitterAccount.execute({
      username: username,
      email: email,
      password: password,
    });

    const result = {
      id: twitterAccount.props.id,
      username: twitterAccount.props.username,
      email: twitterAccount.props.email,
      createdAt: twitterAccount.props.createdAt,
    };

    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

accountRouter.post("/signin", async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;

    const twitterAccount = await signInTwitterAccount.execute({
      email: email,
      password: password,
    });

    const token = jwt.sign(
      { id: twitterAccount.props.id, email: twitterAccount.props.email },
      jwtSecret
    );

    const result = `Welcome to Twitter ${twitterAccount.props.username}`;

    res.status(201).send({ result, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

accountRouter.use(Auth);
accountRouter.patch("/update", async (req, res) => {
  try {
    const authRequest = req as RequestAuth;
    const userId = authRequest.user.id;
    const body = req.body;
    const { username } = body;

    const update = await updateAccount.execute({
      id: userId,
      username: username,
    });

    const result = {
      id: userId,
      username: update.props.username,
    };

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});
