import {Request} from "express"
import { IUser } from "./model/student"
declare module "express" {
    interface Request{
        user: null | IUser
    }
}
