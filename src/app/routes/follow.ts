require("dotenv").config();
import { v4 } from "uuid";
const jwt = require("jsonwebtoken");

import express, { Request, Response } from "express";
import { Follow } from "../../core/entities/follow";
import { TwitterPost } from "../../core/entities/twitterPost";
import { TwitterAccount } from "../../core/entities/twitterAccount";
import { Auth, RequestAuth } from "../middlewares/auth";
import { GetFollow } from "../../core/usecases/Follow/GetFollow";
import { GetFeed } from "../../core/usecases/Follow/GetFeed";
import { InMemoryTwitterPostRepository } from "../../adapters/repositories/inMemory/InMemoryTwitterPostRepository";
import { InMemoryFollowRepository } from "../../adapters/repositories/inMemory/InMemoryFollowRepository";
import { InMemoryTwitterAccountRepository } from "../../adapters/repositories/inMemory/InMemoryTwitterAccountRepository";
import { FollowAccount } from "../../core/usecases/Follow/FollowAccount";
import { SqlFollowRepository } from "../../adapters/repositories/SQL/SqlFollowRepository";
import dbConfig from "../config/dbConfig";
import { SqlFollowMapper } from "../../adapters/repositories/mappers/SqlFollowMapper";
import { SqlTwitterPostRepository } from "../../adapters/repositories/SQL/SqlTwitterPostRepository";
import { SqlTwitterPostMapper } from "../../adapters/repositories/mappers/SqlTwitterPostMapper";

export const followRouter = express.Router();

export const twitterPostMap = new Map<String, TwitterPost>();
export const followMap = new Map<string, Follow>();
export const twitterAccountMap = new Map<String, TwitterAccount>();

const twitterPostRepository = new InMemoryTwitterPostRepository(twitterPostMap);
const followRepository = new InMemoryFollowRepository(followMap);
const sqlFollowRepository = new SqlFollowRepository(dbConfig, new SqlFollowMapper())
const twitterRepository = new InMemoryTwitterAccountRepository(twitterAccountMap);
const sqlTwitterPostRepository = new SqlTwitterPostRepository(dbConfig, new SqlTwitterPostMapper())

const follower = new FollowAccount(sqlFollowRepository);
const getFollow = new GetFollow(sqlFollowRepository);
const getFeed = new GetFeed(sqlFollowRepository, sqlTwitterPostRepository);

followRouter.use(Auth);
followRouter.post("/follow", async (req: Request, res: Response) => {
  try {
    const reqAuth = req as RequestAuth;
    const body = req.body;
    const { followedBy } = body;
    const userId = reqAuth.user.id;

    const follow = await follower.execute({
      userId: userId,
      followedBy: followedBy,
    });

    const result = {
      idFollow: follow.props.idFollow,
      userId: follow.props.userId,
      followedBy: follow.props.followedBy,
    };

    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

followRouter.get("/follow/:idFollow", async (req: Request, res: Response) => {
  try {
    const idFollow = req.params.idFollow;

    const follow = await getFollow.execute({
      idFollow: idFollow,
    });
    const result = {
      follow: follow,
    };

    res.status(200).send(result.follow.props);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

followRouter.get("/feed", async (req: Request, res: Response) => {
  try {
    const reqAuth = req as RequestAuth;
    const userId = reqAuth.user.id;
    
    const feed = await getFeed.execute({
      id: userId,
    });

    const result = feed.map((elm) => elm.props);

    const arr = result.sort((a, b) => +b.createdAt - +a.createdAt);

    res.status(200).send(arr);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});