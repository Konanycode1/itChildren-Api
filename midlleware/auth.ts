import { verifyToken } from "../util/token";
import express, {Response, Request} from 'express'

export const authUser = async (req:Request, res:Response, )=>{
    const token = req.cookies.token
    let verif = await verifyToken(token)
    if(verif){
        req.user = verif
    }
    else{
        return res.redirect('/login');
    }

}