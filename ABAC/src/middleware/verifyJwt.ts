import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {User} from "../types/role.ts";
import {generateAccessToken} from "../utils/token.ts";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    try{
        const user:User = {
            id: "56f60a68-1f3b-4fa2-9855-4e67f62e3ad6",
            username: "mock@user.com",
            email: "mock@user.com",
            role: "user",
        }
        const token = generateAccessToken(user)
        if (!token) {
            res.status(401).send('No token provided');
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as User;
        console.log(decoded);
        if (!decoded) {
            res.status(401).send('Invalid token');
            return;
        }
        req.user = decoded;
        next();
    }catch(err){
        console.log(err)
        res.status(400).send({'something went wrong': 'Invalid token'});
    }
}