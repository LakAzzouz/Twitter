require('dotenv').config()
import jwt from 'jsonwebtoken'
import { Request } from "express"

const jwtSecret = process.env.JWT_SECRET

type DecodedToken = {
    id: string
}

export interface RequestFollow extends Request {
    follow: DecodedToken
}

export const TwitterFollow = (req: any, res: any, next: any) => {
    try{
        const decodeJwt = jwt.verify(
            req.headers.authorization as string,
            jwtSecret as string
        ) as any;
        req.follow = {
            id: decodeJwt.id
        }
        return next()
    }catch(error){
        return res.sendStatus(401)
    }
}