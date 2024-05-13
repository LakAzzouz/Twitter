"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const Auth = (req, res, next) => {
    try {
        const decodedJwt = jsonwebtoken_1.default.verify(req.headers.autorization, jwtSecret);
        req.user = {
            id: decodedJwt.id,
            email: decodedJwt.email
        };
        return next();
    }
    catch (error) {
        return res.sendStatus(401);
    }
};
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map