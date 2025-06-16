import {NextFunction, Request, Response} from 'express';
import {UserService} from '../services/user.service'
import {User} from "../types/role.ts";
import {BaseError} from "../errors/BaseError.ts";

export class  UserController {
    constructor(private userService: UserService) {}

    loginController = (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as User;
        if (!user) {
             res.status(401).json({ error: 'Invalid Credentials' });
             return;
        }
        res.status(200).json('Logged in');
    }
    showProducts = (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as User;
            if (!user) {
                res.status(401).json({ error: 'Invalid Credentials' });
                return;
            }
            const products = this.userService.getAllProducts(user)
            res.status(200).json({products});
            return
        }
        catch (err:any) {
             res.status(err.statusCode).json( err.name);
        }
    }

}