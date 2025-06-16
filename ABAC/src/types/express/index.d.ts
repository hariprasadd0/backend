import {User} from "../role.ts";

declare global{
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}