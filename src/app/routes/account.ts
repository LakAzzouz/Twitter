require('dotenv').config()
const jwt = require('jsonwebtoken');

import express from "express";
import { TwitterAccount } from "../../core/entities/twitterAccount";
import { CreateTwitterAccount } from "../../core/usescases/Account/CreateTwitterAccount";
import { BCryptGateway } from "../../adapters/gateway/BcryptGateway";
import { SignInTwitterAccount } from "../../core/usescases/Account/SignInTwitterAccount";
import { InMemoryTwitterAccountRepository } from "../../adapters/repositories/InMemoryTwitterAccountRepository";
import { Auth, RequestAuth } from "../middlewares/auth";
import { UpdateTwitterAccount } from "../../core/usescases/Account/UpdateTwitterAccount";

export const accountRouter = express.Router();

export const twitterAccountMap = new Map<String, TwitterAccount>();

const jwtSecret = process.env.JWT_SECRET
const twitterRepository = new InMemoryTwitterAccountRepository(twitterAccountMap);
const bcrypt = new BCryptGateway();
const createTwitterAccount = new CreateTwitterAccount(bcrypt, twitterRepository);
const signInTwitterAccount = new SignInTwitterAccount(bcrypt, twitterRepository);
const updateAccount = new UpdateTwitterAccount(twitterRepository);

accountRouter.post("/signup", async (req, res) => {
    try{
        const body = req.body;
        const {username, email, password} = body;

        const twitterAccount = await createTwitterAccount.execute({
            username: username,
            email: email,
            password: password
        })

        const result = {
            id: twitterAccount.props.id,
            username: twitterAccount.props.username,
            email: twitterAccount.props.email,
            createdAt: twitterAccount.props.createdAt
        }

        res.status(201).send(result);

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})

accountRouter.post("/signin", async (req, res) => {
    try{
        const body = req.body;
        const {email, password} = body;

        const twitterAccount = await signInTwitterAccount.execute({
            email: email,
            password: password
        })

        const token = jwt.sign({username: twitterAccount.props.username, email: twitterAccount.props.email}, jwtSecret)

        const result = `Welcome to Twitter ${twitterAccount.props.username}`;

        res.status(201).send({result, token});

    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})
accountRouter.use(Auth) 
accountRouter.patch("/update", async (req, res) => {
    try{
        const authRequest = req as RequestAuth
        const userId = authRequest.user.id
        const body = req.body;
        const {username} = body

        const update = await updateAccount.execute({
            id: userId,
            username: username
        })

        const result = {
            id: userId,
            username: update.props.username
        }

        res.status(200).send(result)
    
    }catch(error){
        if(error instanceof Error){
            return res.status(400).send(error.message)
        }
    }
})