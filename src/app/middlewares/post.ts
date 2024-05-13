require('dotenv').config()
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"

const jwtSecret = process.env.JWT_SECRET

type DecodedToken = {
    id: string
}

export interface RequestPost extends Request {
    post: DecodedToken
}

export const Post = (req: any, res: any, next: any) => {
    try{
        const decodeJwt = jwt.verify(
            req.headers.authorization as string,
            jwtSecret as string
        ) as any;
        req.post = {
            id: decodeJwt.id
        }
        return next()
    }catch(error){
        return res.sendStatus(401)
    }
}