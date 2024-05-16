require("dotenv").config();
const jwt = require("jsonwebtoken");

import express, { Request, Response } from "express";
import { Space } from "../../core/entities/space";
import { InMemorySpaceRepository } from "../../adapters/repositories/InMemorySpace";
import { Auth } from "../middlewares/auth";
import { SpacePost } from "../../core/usescases/Space/SpacePost";
import { GetSpace } from "../../core/usescases/Space/GetSpace";
import { SpacePatch } from "../../core/usescases/Space/SpacePatch";

export const spaceRouteur = express.Router();

export const spaceMap = new Map<String, Space>();

const spaceRepository = new InMemorySpaceRepository(spaceMap);

const spacePost = new SpacePost(spaceRepository);
const getSpace = new GetSpace(spaceRepository);
const spacePatch = new SpacePatch(spaceRepository);
const jwtSecret = process.env.JWT_SECRET;

spaceRouteur.use(Auth);
spaceRouteur.post("/space", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { speaker, listener } = body;

    const space = await spacePost.execute({
      speaker: speaker,
      listener: listener,
    });

    const result = {
      spaceId: space.props.spaceId,
      speaker: space.props.speaker,
      listener: space.props.listener,
      createdAt: space.props.createAt,
    };

    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

spaceRouteur.get("/space/:spaceId", async (req: Request, res: Response) => {
  try {
    const spaceId = req.params.spaceId;

    const space = await getSpace.execute({
      spaceId: spaceId,
    });

    const result = {
      speaker: space.props.speaker,
      listener: space.props.listener,
      createdAt: space.props.createAt,
    };

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

spaceRouteur.patch("/space/:spaceId", async (req: Request, res: Response) => {
  try {
    const spaceId = req.params.spaceId;
    const body = req.body;
    const { speaker, listener } = body;

    const space = await spacePatch.execute({
      spaceId: spaceId,
      speaker: speaker,
      listener: listener,
    });

    const result = {
      spaceId: space.props.spaceId,
      speaker: space.props.speaker,
      listener: space.props.listener,
    };
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});
