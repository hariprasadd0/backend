import jwt from 'jsonwebtoken';
import {User} from "../types/role.ts";

export const generateAccessToken = (payload:User) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string,{
        expiresIn:'15m',
    });
}

