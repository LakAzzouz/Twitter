require('dotenv').config()
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"

const jwtSecret = process.env.JWT_SECRET

type DecodedToken = {
    id: string
}

export interface RequestSpace extends Request {
    space: DecodedToken
}

export const Space = (req: any, res: any, next: any) => {
    try{
        const decodedJwt = jwt.verify(
            req.headers.authorization as string,
            jwtSecret as string
        ) as any;
        req.space = {
            id: decodedJwt.id
        }
        return next();
    }catch(error){
        return res.sendStatus(401)
    }
}