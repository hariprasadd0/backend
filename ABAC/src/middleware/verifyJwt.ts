import jwt from 'jsonwebtoken';
import { Request, Response,NextFunction } from 'express';

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.header('Authorization')?.replace('Bearer','');
        if (!token) {
            return res.status(401).send('No token provided');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).send({'something went wrong': 'Invalid token'});
    }
}