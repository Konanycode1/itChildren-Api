import { verifyToken } from "../util/token";

export const authUser = async (req, res, next)=>{
    const token = req.cookies.token
    let verif = await verifyToken(token)
    if(verif){
        req.user = verif
    }
    else{
        return res.redirect('/login');
    }

}