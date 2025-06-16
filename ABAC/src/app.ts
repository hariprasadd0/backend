import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {Policy} from "./policies/policy.ts";
import {Abac} from "./middleware/abac.ts";
import {UserService} from "./services/user.service.ts";
import {UserController} from "./controllers/auth.controller.ts";
import {authRoutes} from "./routes/auth.route.ts";

dotenv.config();
const app = express();
const policyService = new Policy()
const abac = new Abac(policyService);
const userService = new UserService(abac)
const authController = new UserController(userService);

app.use(cors());
app.use(express.json());
app.use('/user', authRoutes(authController));



export default app;
