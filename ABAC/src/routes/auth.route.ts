
import { Router, Request, Response } from 'express';
import {verifyJwt} from "../middleware/verifyJwt.ts";
import {UserController} from "../controllers/auth.controller.ts";


export function authRoutes(userController: UserController) {

const router = Router();

router.post('/login',verifyJwt, userController.loginController);

router.get('/products',verifyJwt, userController.showProducts);

return router;
}


